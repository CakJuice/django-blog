const initialState = {
  fetching: false,
  fetched: false,
  categories: [],
  error: null,
}

const categoriesReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_PENDING": {
      return {
        ...state,
        fetching: true,
      }
    }
    case "FETCH_CATEGORIES_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    }
    case "FETCH_CATEGORIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        categories: action.payload.data.data.allCategories.edges,
      }
    }
    default: {
      return state;
    }
  }
}

export default categoriesReducer;
