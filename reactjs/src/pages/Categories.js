import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody } from 'reactstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import config from '../config';
import { fetchCategories } from '../actions/categoryActions';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   categories: props.categories,
    // }

    const cookies = new Cookies();
    this.csrftoken = cookies.get('csrftoken');

    this.inputComponent = {
      name: React.createRef(),
      description: React.createRef(),
      slug: React.createRef(),
      parent: React.createRef(),
    };

    this.submitForm = this.submitForm.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     categories: nextProps.categories
  //   });
  // }

  submitForm(e) {
    e.preventDefault();

    let allValid = true;
    let dataInput = {};

    if (this.inputComponent.slug.current.state.value === '') {
      this.inputComponent.slug.current.setState({
        value: this.inputComponent.name.current.state.value.slugify()
      });
    }

    for (const key in this.inputComponent) {
      const elem = this.inputComponent[key].current;
      const valid = elem.checkValidation();
      if (valid) {
        dataInput[key] = elem.state.value || null;
      } else allValid = false;
    }

    if (!allValid) return;

    axios.post(config.graphqlUrl, {
      variables: {
        input: dataInput
      },
      query: `
        mutation createCategory($input: CreateCategoryInput!) {
          createCategory(input: $input) {
            category {
              id
              name
            }
          }
        }
      `
    }, {
      headers: {
        'X-CSRFToken': this.csrftoken,
      }
    }).then((response) => {
      console.log(response.data);
    });
  }

  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col col-lg-4 col-12">
            <Card>
              <CardHeader>
                <h5>New Category</h5>
              </CardHeader>
              <CardBody>
                <form method="POST" action={config.graphqlUrl} onSubmit={this.submitForm} noValidate>
                  <FormInput ref={this.inputComponent.name} name="name" label="Name" validators={['isRequired']} />
                  <FormInput ref={this.inputComponent.description} name="description" label="Description" />
                  <FormInput ref={this.inputComponent.slug} name="slug" label="Slug" validators={['isRequired']} />
                  <FormSelect ref={this.inputComponent.parent} name="parent" label="Parent" options={this.props.categories} />
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = store => ({ categories: store.categories })

// class Categories extends React.Component {
class CategoryList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = 'Categories - Admin Page';
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { categories } = this.props;
    const mappedCategory = categories.categories.map(category => ({
        key: category.node.id,
        value: category.node.name
      })
    );
    return (
      <CategoryForm categories={mappedCategory} />
    );
  }
}

const Categories = connect(mapStoreToProps)(CategoryList);

export default Categories;
