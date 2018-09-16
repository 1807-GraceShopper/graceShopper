import axios from 'axios'

const initialState = []

//Action type
const GET_CATEGORIES = 'GET_CATEGORIES'
const POST_CATEGORY = 'POST_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

//Action creator

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

const postCategory = category => ({
  type: POST_CATEGORY,
  category
})

const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
})

const deleteCategory = categoryId => ({
  type: DELETE_CATEGORY,
  categoryId
})

//Thunk middleware
export const getCategoriesFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/categories')
    dispatch(getCategories(res.data))
  }
}

export const postCategoryToServer = category => {
  return async dispatch => {
    const res = await axios.post('/api/categories', category)
    dispatch(postCategory(res.data))
  }
}

export const updateCategoryToServer = category => {
  return async dispatch => {
    const res = await axios.put(`/api/categories/${category.id}`, category)
    dispatch(updateCategory(res.data))
  }
}

export const deleteCategoryFromServer = categoryId => {
  return async dispatch => {
    await axios.delete(`/api/categories/${categoryId}`)
    dispatch(deleteCategory(categoryId))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case POST_CATEGORY:
      return [...state, action.category]
    case UPDATE_CATEGORY:
      const updatedCategories = state.map(
        category =>
          action.category.id === category.id ? action.category : category
      )
      return updatedCategories
    case DELETE_CATEGORY:
      const newCategories = state.filter(
        category => action.categoryId !== category.id
      )
      return newCategories
    default:
      return state
  }
}

export default reducer
