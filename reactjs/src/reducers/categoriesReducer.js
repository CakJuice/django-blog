const initialState = {
  fetching: false,
  fetched: false,
  categories: [],
  error: null,
}

const categoriesReducer = (state=initialState, action) => {
  if (action.type === "FETCH_CATEGORIES_PENDING" || action.type === "POST_FETCH_CATEGORIES_PENDING") {
    return {
      ...state,
      fetching: true,
    }
  } else if (action.type === "FETCH_CATEGORIES_REJECTED" || action.type === "POST_FETCH_CATEGORIES_REJECTED") {
    return {
      ...state,
      fetching: false,
      error: action.payload,
    }
  } else if (action.type === "FETCH_CATEGORIES_FULFILLED") {
    return {
      ...state,
      fetching: false,
      fetched: true,
      categories: action.payload.data.data.allCategories.edges,
    }
  } else if (action.type === "POST_FETCH_CATEGORIES_FULFILLED") {
    return {
      ...state,
      fetching: false,
      fetched: true,
      categories: action.payload.data.data.createCategory.allCategories.edges,
    }
  }

  return state;
}

export default categoriesReducer;
