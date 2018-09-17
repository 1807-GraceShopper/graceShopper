import axios from 'axios'

//Action types

const initalState = {orders: [], singleOrder: {}}

const CLEAR_CART = 'CLEAR_CART'
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_BY_USER = 'GET_ORDERS_BY_USER'
const GET_ORDERS_BY_STATUS = 'GET_ORDERS_BY_STATUS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

const createOrders = order => ({
  type: CLEAR_CART,
  order
})

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const getOrder = singleOrder => ({
  type: GET_SINGLE_ORDER,
  singleOrder
})

const getOrdersByUser = orders => ({
	type: GET_ORDERS_BY_USER,
	orders
})

const getOrders = orders => ({
	type: GET_ORDERS,
	orders
})

const getOrdersByStatus = orders => ({
	type: GET_ORDERS_BY_STATUS,
	orders
})

export const createOrderInServer = cart => {
  return async dispatch => {
    const res = await axios.post(`/api/orders`, cart)
    dispatch(createOrders(res.data))
  }
}

export const getOrdersFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/orders')
    dispatch(getOrders(res.data))
  }
}

export const getOrdersByUserServer = userId => {
	return async dispatch => {
		const userOrders = await axios.get(`/api/orders/orderSummary/${userId}`)
		dispatch(getOrdersByUser(userOrders.data))
	}
}

export const getOrdersFromServer = () => {
	return async dispatch => {
		const orders = await axios.get('/api/orders')
		dispatch(getOrders(orders.data))
	}
}

export const getOrdersByStatusServer = status => {
	return async dispatch => {
		let res
		if (status) {
			console.log('here', status)
			res = await axios.get(`/api/orders/statuses/${status}`)
		} else {
			res = await axios.get('/api/orders')
		}
		dispatch(getOrdersByStatus(res.data))
	}
}
const reducer = (state = {orders: [], userOrders: []}, action) => {
	switch (action.type) {
		case CLEAR_CART:
			return {...state, orders: [...state.orders, action.order]}
		case GET_ORDERS_BY_USER:
			return {...state, userOrders: action.orders}
		case GET_ORDERS:
			return {...state, orders: action.orders}
		case GET_ORDERS_BY_STATUS:
			return {...state, orders: action.orders}
		default:
			return state
	}

}

export default reducer
