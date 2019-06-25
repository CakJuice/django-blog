import axios from "axios";

import { getCSRF } from '../tools/helpers';
import config from '../config';

export function fetchCategories() {
  return {
    type: "FETCH_CATEGORIES",
    payload: axios.post(config.graphqlUrl, {
      query: `
        query {
          allCategories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `
    }, {
      headers: {
        'X-CSRFToken': getCSRF(),
      }
    }),
  }
}

export function postAndFetchCategories(variables) {
  return {
    type: "POST_FETCH_CATEGORIES",
    payload: axios.post(config.graphqlUrl, {
      variables: variables,
      query: `
        mutation createCategory($input: CreateCategoryInput!) {
          createCategory(input: $input) {
            allCategories {
              edges {
                node {
                  id
                  name
                  slug
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
    }),
  }
}
