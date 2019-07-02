import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody } from 'mdbreact';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import config from '../config';
import { getCSRF } from '../tools/helpers';
import axios from 'axios';
import { fetchCategories } from '../actions/categoryActions';

function CategoryForm(props) {
  const { categories } = props.categories
  const optionCategories = categories.map(category => ({
      key: category.node.id,
      value: category.node.name
    })
  );

  const inputRef = {
    name: useRef(null),
    description: useRef(null),
    slug: useRef(null),
    parent: useRef(null),
  }

  function onBlurName(e) {
    if (inputRef.slug.current.state.value === "") {
      inputRef.slug.current.setState({
        value: inputRef.name.current.state.value.slugify()
      });
    }
  }

  function resetForm() {
    for (const key in inputRef) {
      const elem = inputRef[key].current;
      elem.resetState();
    }
  }

  function submitForm(e) {
    e.preventDefault();

    let allValid = true;
    let dataInput = {};

    for (const key in inputRef) {
      const elem = inputRef[key].current;
      const valid = elem.checkValidation();
      if (valid) {
        if (elem.state.value == null || elem.state.value === "") {
          continue;
        }
        dataInput[key] = elem.state.value;
      } else {
        allValid = false
      };
    }

    if (!allValid) return;

    props.dispatch((dispatch) => {
      dispatch({ type: "POST_FETCH_CATEGORIES_PENDING" });
      axios.post(config.graphqlUrl, {
        variables: {
          input: dataInput
        },
        query: `
          mutation createCategory($input: CreateCategoryInput!) {
            createCategory(input: $input) {
              allCategories {
                edges {
                  node {
                    id
                    name
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
            inputRef.slug.current.setUniqueError();
          }
          return dispatch({
            type: "POST_FETCH_CATEGORIES_REJECTED",
            payload: errorMsg,
          });
        }

        resetForm();
        return dispatch({
          type: "POST_FETCH_CATEGORIES_FULFILLED",
          payload: response,
        });
      });
    });
  }

  return (
    <MDBContainer className="my-3">
      <MDBRow>
        <MDBCol lg="4" size="12">
          <MDBCard>
            <MDBCardHeader>
              <h5>New Category</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <form method="POST" onSubmit={submitForm} noValidate>
                <FormInput ref={inputRef.name} name="name" label="Name" validators={['isRequired']} onBlur={onBlurName} />
                <FormInput ref={inputRef.description} name="description" label="Description" />
                <FormInput ref={inputRef.slug} name="slug" label="Slug" validators={['isRequired']} />
                <FormSelect ref={inputRef.parent} name="parent" label="Parent" options={optionCategories} />
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const mapStateToProps = state => ({ categories: state.categories });

function CategoriesPage(props) {
  useEffect(() => {
    document.title = 'Categories - Admin Page';
    props.dispatch(fetchCategories());
  }, []);

  return (
    <CategoryForm categories={props.categories} dispatch={props.dispatch} />
  );
}

const Categories = connect(mapStateToProps)(CategoriesPage);

export default Categories;
