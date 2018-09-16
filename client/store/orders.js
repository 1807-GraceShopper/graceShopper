import axios from 'axios'

//Action types

const CLEAR_CART = 'CLEAR_CART'

const createOrders = order => ({
	type: CLEAR_CART,
	order
})

export const createOrderInServer = cart => {
	return async dispatch => {
		const res = await axios.post(`/api/orders`, cart)
		dispatch(createOrders(res.data))
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case CLEAR_CART:
			return [action.order]
		default:
			return state
	}
}

export default reducer
