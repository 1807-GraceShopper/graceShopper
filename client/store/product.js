import axios from 'axios'

const initialState = {products: [], singleProduct: {}}

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Action creators
const getProducts = products => ({
	type: GET_PRODUCTS,
	products
})

//Thunk middleware
export const getProductsFromServer = () => {
	return async dispatch => {
		const res = await axios.get('/products')
		dispatch(getProducts(res.data))
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return {...state, products: action.products}
		default:
			return state
	}
}

export default reducer
