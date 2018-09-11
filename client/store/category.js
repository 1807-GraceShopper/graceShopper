import axios from 'axios'

const initialState = []

//Action type
const GET_CATEGORIES = 'GET_CATEGORIES'

//Action creator

const getCategories = categories => ({
	type: GET_CATEGORIES,
	categories
})

//Thunk middleware
export const getCategoriesFromServer = () => {
	return async dispatch => {
		const res = await axios.get('/api/categories')
		dispatch(getCategories(res.data))
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.categories
		default:
			return state
	}
}

export default reducer
