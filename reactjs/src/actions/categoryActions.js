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
                description
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
