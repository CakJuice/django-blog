import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody } from 'reactstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import config from '../config';

function CategoryForm(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [slug, setSlug] = useState(null);
  const [parentOptions, setParentOptions] = useState([]);
  const [isTypedSlug, setTypedSlug] = useState(false);
  
  useEffect(() => {
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
    }).then((response) => {
      const edges = response.data.data.allCategories.edges;
      const parentItems = edges.map((edge) => ({
          key: edge.node.id,
          value: edge.node.name
        })
      );
      setParentOptions(parentItems);
    });
  }, []);

  function changeName(e) {
    setName(e.target.value);
    if (!isTypedSlug) {
      setSlug(e.target.value.slugify());
    }
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function changeSlug(e) {
    setSlug(e.target.value);
    if (!isTypedSlug) {
      setTypedSlug(true);
    }
  }

  function submitForm(e) {
    e.preventDefault();
    console.log(name, description, slug);
  }

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col col-lg-4 col-12">
          <Card>
            <CardHeader>
              <h5>New Category</h5>
            </CardHeader>
            <CardBody>
              <form method="POST" action="/graphql" onSubmit={submitForm} noValidate>
                <FormInput name="name" label="Name" onChange={changeName} value={name} required />
                <FormInput name="description" label="Description" onChange={changeDescription} value={description} />
                <FormInput name="slug" label="Slug" onChange={changeSlug} value={slug} required />
                <FormSelect name="parent" label="Parent" options={parentOptions} />
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

// class CategoriesForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.dataKey = ['name', 'description', 'slug', 'parent', 'language'];
//     this.state = {
//       isTypedSlug: false,
//       name: null,
//       description: null,
//       slug: null,
//       selectParent: [],
//     }
//     this.changeName = this.changeName.bind(this);
//     this.changeDescription = this.changeDescription.bind(this);
//     this.changeSlug = this.changeSlug.bind(this);
//     this.submitForm = this.submitForm.bind(this);
//     this.getCategoryParent = this.getCategoryParent.bind(this);
//   }

//   getCategoryParent() {
//     axios.post(config.graphqlUrl, {
//       query: `
//         query {
//           allCategories {
//             edges {
//               node {
//                 id
//                 name
//               }
//             }
//           }
//         }
//       `
//     }).then((response) => {
//       const edges = response.data.data.allCategories.edges;
//       const parent = edges.map((edge) => ({
//           key: edge.node.id,
//           value: edge.node.name
//         })
//       );
      
//       this.setState({
//         selectParent: parent,
//       });
//     });
//   }

//   componentDidMount() {
//     document.title = 'Categories';
//     this.getCategoryParent();
//   }

//   changeName(e) {
//     this.setState({
//       name: e.target.value,
//     });

//     if (!this.state.isTypedSlug) {
//       this.setState({
//         slug: e.target.value.slugify(),
//       });
//     }
//   }

//   changeDescription(e) {
//     this.setState({
//       description: e.target.value,
//     });
//   }

//   changeSlug(e) {
//     this.setState({
//       slug: e.target.value,
//     });
//     if (!this.state.isTypedSlug) {
//       this.setState({
//         isTypedSlug: true,
//       });
//     }
//   }

//   submitForm(e) {
//     e.preventDefault();
//     const cookies = new Cookies();
//     const csrftoken = cookies.get('csrftoken');
//     const data = {
//       name: this.state.name,
//       description: this.state.description,
//       slug: this.state.slug,
//     };
//     const self = this;
//     axios.post(config.graphqlUrl, {
//       variables: {
//         input: {
//           name: self.state.name,
//           description: self.state.description,
//           slug: self.state.slug,
//         }
//       },
//       query: `
//         mutation createCategory($input: CreateCategoryInput!) {
//           createCategory(input: $input) {
//             category {
//               id
//               name
//             }
//           }
//         }
//       `
//     }).then((response) => {
//       console.log(response.data);
//     });
//   }

//   render() {
//     return (
//       <div className="container my-3">
//         <div className="row">
//           <div className="col col-lg-4 col-12">
//             <Card>
//               <CardHeader>
//                 <h5>New Category</h5>
//               </CardHeader>
//               <CardBody>
//                 <form method="POST" action="/graphql" onSubmit={this.submitForm} noValidate>
//                   <FormInput name="name" label="Name" onChange={this.changeName} value={this.state.name} required />
//                   <FormInput name="description" label="Description" onChange={this.changeDescription} value={this.state.description} />
//                   <FormInput name="slug" label="Slug" onChange={this.changeSlug} value={this.state.slug} required />
//                   <FormSelect name="parent" label="Parent" options={this.state.selectParent} />
//                   <button type="submit" className="btn btn-success">Submit</button>
//                 </form>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default function Categories(props) {
  return (
    <CategoryForm />
  );
}
