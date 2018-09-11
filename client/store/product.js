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
	const dummyData = [
		{
			name: 'Air Jordans',
			description: "From what I've heard, a really expensive shoe",
			price: 1500,
			imageUrl: 'defaultShoe.png'
		},
		{
			name: 'Christian Louboutin',
			description: 'Also a very expensive shoe',
			price: 800,
			imageUrl: 'defaultShoe.png'
		},
		{
			name: 'Nike',
			description: 'A more moderate shoe',
			price: 70,
			imageUrl: 'defaultShoe.png'
		}
	]
	return async dispatch => {
		//const res = await axios.get('/products')
		//dispatch(getProducts(res.data))
		dispatch(getProducts(dummyData))
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
