import axios from 'axios'

//Action types

const initalState = {orders: [], singleOrder: {}}

const CLEAR_CART = 'CLEAR_CART'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const GET_ORDERS = 'GET_ORDERS'

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

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return {
        ...state,
        orders: [...state.orders, action.order],
        singleOrder: action.order
      }
    case GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default reducer
