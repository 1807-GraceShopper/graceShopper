import axios from 'axios'

const initialState = {products: [], singleProduct: {}}

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_PRODUCT'

//Action creators
const getProducts = products => ({
	type: GET_PRODUCTS,
	products
})

const getProduct = product => ({
	type: GET_SINGLE_PRODUCT,
	product
})

//Thunk middleware
export const getProductsFromServer = () => {
	return async dispatch => {
		const res = await axios.get('/api/products')
		dispatch(getProducts(res.data))
	}
}

export const getProductsByCategoryFromServer = categoryId => {
	return async dispatch => {
		let res
		if (categoryId) {
			res = await axios.get(`/api/categories/${categoryId}`)
		} else {
			res = await axios.get('/api/products')
		}
		dispatch(getProducts(res.data))
	}
}

export const getSingleProduct = id => {
	return async dispatch => {
		const {data} = await axios.get(`/api/products/${id}`)
		const action = getProduct(data)
		dispatch(action)
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return {...state, products: action.products}
		case GET_SINGLE_PRODUCT:
			return {...state, singleProduct: action.product}
		default:
			return state
	}
}

export default reducer
