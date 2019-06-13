import React from 'react';
import {
  Card,
  CardHeader,
  CardBody } from 'reactstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import config from '../config';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.dataKey = ['name', 'description', 'slug', 'parent', 'language'];
    this.state = {
      // isTypedSlug: false,
      // name: null,
      // description: null,
      // slug: null,
      selectParent: [],
    }
    
    const cookies = new Cookies();
    this.csrftoken = cookies.get('csrftoken');

    this.inputComponent = {
      name: React.createRef(),
      description: React.createRef(),
    };
    
    // this.changeName = this.changeName.bind(this);
    // this.changeDescription = this.changeDescription.bind(this);
    // this.changeSlug = this.changeSlug.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getCategoryParent = this.getCategoryParent.bind(this);
  }

  getCategoryParent() {
    axios.post(config.graphqlUrl, {
      query: `
        query {
          allCategories {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `
    }, {
      headers: {
        'X-CSRFToken': this.csrftoken,
      }
    }).then((response) => {
      const edges = response.data.data.allCategories.edges;
      const parent = edges.map((edge) => ({
          key: edge.node.id,
          value: edge.node.name
        })
      );
      
      this.setState({
        selectParent: parent,
      });
    });
  }

  componentDidMount() {
    document.title = 'Categories';
    return;
    this.getCategoryParent();
  }

  // changeName(e) {
  //   this.setState({
  //     name: e.target.value,
  //   });

  //   if (!this.state.isTypedSlug) {
  //     this.setState({
  //       slug: e.target.value.slugify(),
  //     });
  //   }
  // }

  // changeDescription(e) {
  //   this.setState({
  //     description: e.target.value,
  //   });
  // }

  // changeSlug(e) {
  //   this.setState({
  //     slug: e.target.value,
  //   });
  //   if (!this.state.isTypedSlug) {
  //     this.setState({
  //       isTypedSlug: true,
  //     });
  //   }
  // }

  submitForm(e) {
    e.preventDefault();

    let allValid = true;
    let dataInput = {};
    for (const key in this.inputComponent) {
      const valid = this.inputComponent[key].current.checkValidation();
      if (valid) {
        dataInput[key] = this.inputComponent[key].current.value || null;
      } else allValid = false;
    }

    console.log(dataInput);
    if (!allValid) return;
    return;

    const self = this;
    axios.post(config.graphqlUrl, {
      variables: {
        input: {
          name: self.state.name,
          description: self.state.description,
          slug: self.state.slug,
        }
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
                  {/* <FormInput name="slug" label="Slug" onChange={this.changeSlug} value={this.state.slug} required /> */}
                  {/* <FormSelect name="parent" label="Parent" options={this.state.selectParent} /> */}
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

export default function Categories(props) {
  return (
    <CategoryForm />
  );
}
