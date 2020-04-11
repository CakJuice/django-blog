import React, { useEffect, useRef, createRef } from 'react';
import { connect } from 'react-redux';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBDataTable } from 'mdbreact';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import config from '../config';
import { getCSRF } from '../tools/helpers';
import axios from 'axios';
import { fetchCategories } from '../actions/categoryActions';
import BaseForm from '../components/BaseForm';

class CategoryForm extends BaseForm {
  constructor(props) {
    super(props);
    this.inputRef = {
      name: createRef(),
      description: createRef(),
      slug: createRef(),
      parent: createRef(),
    };

    this.state = {
      id: null,
    }

    this.submitForm = this.submitForm.bind(this);
    this.onBlurName = this.onBlurName.bind(this);
  }

  componentDidMount() {
    // console.log('--- component did mount ---', this.props.category);
    if (this.props.category.hasOwnProperty('id')) {
      this.setState({
        id: this.props.category.id
      });
      this.inputRef.name.current.setState({
        value: this.props.category.name
      });
      this.inputRef.description.current.setState({
        value: this.props.category.description
      });
      this.inputRef.slug.current.setState({
        value: this.props.category.slug
      });
    }
  }

  onBlurName(e) {
    if (this.inputRef.slug.current.state.value === "") {
      this.inputRef.slug.current.setState({
        value: this.inputRef.name.current.state.value.slugify()
      });
    }
  }

  submitForm(e) {
    e.preventDefault();

    if (this.disabled) return;

    const validation = this.checkInputValidation();
    if (!validation.isValid) {
      return;
    }
    
    this.disableForm();

    const self = this;
    this.props.dispatch((dispatch) => {
      dispatch({ type: "POST_FETCH_CATEGORIES_PENDING" });
      axios.post(config.graphqlUrl, {
        variables: {
          input: validation.dataInput
        },
        query: `
          mutation createCategory($input: CreateCategoryInput!) {
            createCategory(input: $input) {
              allCategories {
                edges {
                  node {
                    id
                    name
                    description
                    slug
                    parent {
                      id
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        `
      }, {
        headers: {
          'X-CSRFToken': getCSRF(),
        }
      })
      .then((response) => {
        if (response.data.hasOwnProperty('errors') && response.data.errors.length > 0) {
          const errorMsg = response.data.errors[0].message
          if (errorMsg.indexOf("duplicate") >= 0) {
            self.inputRef.slug.current.setUniqueError();
          }
          this.enableForm();
          return dispatch({
            type: "POST_FETCH_CATEGORIES_REJECTED",
            payload: errorMsg,
          });
        }

        self.resetForm();
        return dispatch({
          type: "POST_FETCH_CATEGORIES_FULFILLED",
          payload: response,
        });
      });
    });
  }

  render() {
    const { categories } = this.props.categories
    const optionCategories = categories.map(category => ({
        key: category.node.id,
        value: category.node.name
      })
    );

    return (
      <MDBCard>
        <MDBCardHeader>
          <h5>New Category</h5>
        </MDBCardHeader>
        <MDBCardBody>
          <form method="POST" onSubmit={this.submitForm} noValidate>
            <FormInput ref={this.inputRef.name} name="name" label="Name" validators={['isRequired']} onBlur={this.onBlurName} />
            <FormInput ref={this.inputRef.description} name="description" label="Description" />
            <FormInput ref={this.inputRef.slug} name="slug" label="Slug" validators={['isRequired']} />
            <FormSelect ref={this.inputRef.parent} name="parent" label="Parent" options={optionCategories} />
            <MDBBtn type="submit" color="primary">Submit</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

function CategoryList(props) {
  const { categories } = props.categories
  const rowCategories = categories.map(category => ({
      id: category.node.id,
      name: category.node.name,
      description: category.node.description,
      slug: category.node.slug,
    })
  );

  const data = {
    columns: [
      // {
      //   label: "ID",
      //   field: "id",
      //   sort: "asc"
      // },
      {
        label: "Name",
        field: "name",
        sort: "asc"
      },
      {
        label: "Description",
        field: "description",
        sort: "asc"
      },
      {
        label: "Slug",
        field: "slug",
        sort: "asc"
      },
    ],
    rows: rowCategories,
  };

  return (
    <MDBCard>
      <MDBCardHeader>
        <h5>Categories</h5>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBDataTable striped bordered hover data={data} />
      </MDBCardBody>
    </MDBCard>
  );
}

const mapStateToProps = state => ({ categories: state.categories });

function CategoriesPage(props) {
  const params = props.match.params;
  let category = {};
  if (params.hasOwnProperty('id')) {
    const categoryId = params.id;
    for (let _category of props.categories.categories) {
      // console.log(categoryId, _category.node.id, categoryId === _category.node.id);
      if (categoryId === _category.node.id) {
        category = {
          id: categoryId,
          name: _category.node.name,
          description: _category.node.description,
          slug: _category.node.slug,
        }
        break;
      }
    }
    
    // console.log(category);
    // if (!category.hasOwnProperty('id')) {
    //   console.log('redirect to 404');
    // }
  }

  useEffect(() => {
    document.title = 'Categories - Admin Page';
    props.dispatch(fetchCategories());
  }, []);

  return (
    <MDBContainer className="my-3">
      <MDBRow>
        <MDBCol lg="4" size="12">
          <CategoryForm categories={props.categories} dispatch={props.dispatch} category={category} />
        </MDBCol>
        <MDBCol lg="8" size="12">
          <CategoryList categories={props.categories} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const Categories = connect(mapStateToProps)(CategoriesPage);

export default Categories;
