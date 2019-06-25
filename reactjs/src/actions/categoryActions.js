import axios from "axios";

export function fetchCategories() {
  // fetch('https://jsonplaceholder.typicode.com/todos')
  //   .then(response => response.json())
  //   .then(json => {
  //     return {
  //       type: 'FETCH_CATEGORIES_FULFILLED',
  //       payload: json,
  //     }
  //   });
  return {
    type: 'FETCH_CATEGORIES',
    payload: axios.get('https://jsonplaceholder.typicode.com/todos')
  }
}