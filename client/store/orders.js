import axios from 'axios'

//Action types

const CLEAR_CART = 'CLEAR_CART'
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_BY_USER = 'GET_ORDERS_BY_USER'
const GET_ORDERS_BY_STATUS = 'GET_ORDERS_BY_STATUS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_STATUS = 'UPDATE_STATUS'

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

const getOrdersByStatus = orders => ({
  type: GET_ORDERS_BY_STATUS,
  orders
})

const updateOrdersByStatus = updatedOrder => ({
  type: UPDATE_STATUS,
  updatedOrder
})

export const createOrderInServer = cart => {
  return async dispatch => {
    const res = await axios.post(`/api/orders`, cart)
    return dispatch(createOrders(res.data))
  }
}

export const getOrdersFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/orders')
    dispatch(getOrders(res.data))
  }
}

export const getSingleOrderFromServer = id => {
  return async dispatch => {
    const res = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(res.data))
  }
}

export const getOrdersByUserServer = userId => {
  return async dispatch => {
    const userOrders = await axios.get(`/api/orders/orderSummary/${userId}`)
    dispatch(getOrdersByUser(userOrders.data))
  }
}

export const getOrdersByStatusServer = status => {
  return async dispatch => {
    let res
    if (status) {
      res = await axios.get(`/api/orders/statuses/${status}`)
    } else {
      res = await axios.get('/api/orders')
    }
    dispatch(getOrdersByStatus(res.data))
  }
}

export const updateStatusOnOrder = status => {
  return async dispatch => {
    const res = await axios.put(`/api/orders/status/${status.id}`, status)
    dispatch(updateOrdersByStatus(res.data))
  }
}

const reducer = (
  state = {orders: [], userOrders: [], singleOrder: {}},
  action
) => {
  switch (action.type) {
    case CLEAR_CART:
      return {
        ...state,
        orders: [...state.orders, action.order],
        singleOrder: action.order
      }
    case GET_SINGLE_ORDER:
      return {...state, singleOrder: action.singleOrder}
    case GET_ORDERS_BY_USER:
      return {...state, userOrders: action.orders}
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case GET_ORDERS_BY_STATUS:
      return {...state, orders: action.orders}
    case UPDATE_STATUS:
      const updatedOrders = state.orders.map(
        order =>
          action.updatedOrder.id === order.id ? action.updatedOrder : order
      )
      return {
        ...state,
        orders: updatedOrders,
        singleOrder: action.updatedOrder
      }
    default:
      return state
  }
}

export default reducer
