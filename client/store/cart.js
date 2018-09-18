import ProductToken from '../utils/ProductToken'
import {
  loadCartFromLocalStorage,
  writeCartIntoLocalStorage
} from '../utils/localStorage'
import axios from 'axios'

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const SET_ITEM_QUANTITY = 'SET_ITEM_QUANTITY'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
const GET_CART = 'GET_CART'

//ACTION CREATORS
export const add = product => ({
  type: ADD_TO_CART,
  product
})

export const remove = id => ({
  type: REMOVE_FROM_CART,
  id
})

const get = cart => ({
  type: GET_CART,
  cart
})

export const increment = cartItem => ({
  type: INCREMENT_ITEM,
  cartItem
})

export const decrement = cartItem => ({
  type: DECREMENT_ITEM,
  cartItem
})

export const setQuantity = cartItem => ({
  type: SET_ITEM_QUANTITY,
  cartItem
})

export const updateQuantity = cartItem => ({
  type: UPDATE_QUANTITY,
  cartItem
})

export const clearCart = cart => ({
  type: CLEAR_CART,
  cart
})

//REDUCER

export default function reducer(cart, action) {
  if (cart === undefined) {
    cart = loadCartFromLocalStorage()
  }
  let nextState
  switch (action.type) {
    case ADD_TO_CART:
      nextState = [...cart, action.product]
      writeCartIntoLocalStorage(nextState)
      return nextState
    case REMOVE_FROM_CART:
      nextState = cart.filter(product => product.id !== action.id)
      writeCartIntoLocalStorage(nextState)
      return nextState
    case GET_CART:
      nextState = cart
      writeCartIntoLocalStorage(nextState)
      return action.cart
    case UPDATE_QUANTITY:
      nextState = cart.map(
        c => (c.id === action.cartItem.id ? action.cartItem : c)
      )
      writeCartIntoLocalStorage(nextState)
      return nextState
    case CLEAR_CART:
      nextState = []
      writeCartIntoLocalStorage(nextState)
      return nextState
    default:
      return cart
  }
}

//THUNK MIDDLEWARE

export function fetchCartFromStorage() {
  return dispatch => {
    const cart = loadCartFromLocalStorage()
    dispatch(get(cart))
  }
}

export function addItemToCart(product) {
  const obj = {
    productId: product.id,
    price: product.price,
    quantity: 1
  }
  return async dispatch => {
    const cart = loadCartFromLocalStorage()
    const match = cart.find(a => a.productId === product.id)
    if (match) {
      const res = await axios.get(`/api/products/${product.id}`)
      const maxQuantity = res.data.quantity
      match.quantity = Math.min(match.quantity + 1, maxQuantity)
      const orderItemRes = await axios.put(`/api/orderItems/${match.productId}`, match)
      dispatch(updateQuantity(match))
    } else {
      const res = await axios.post(`/api/orderItems`, obj)
      const newCartItem = res.data
      dispatch(add(newCartItem))
    }
  }
}

export function removeItemFromCart(id) {
  return async dispatch => {
    await axios.delete(`/api/orderItems/${id}`)
    dispatch(remove(id))
  }
}

export function incrementCartItem(cartItem) {
  return async dispatch => {
    const max = await axios.get(`/api/products/${cartItem.productId}`).data
    cartItem.quantity = Math.min(cartItem.quantity + 1, max)
    const res = await axios.put(`/api/orderItems/${cartItem.id}`, cartItem)
    dispatch(updateQuantity(res.data))
  }
}

export function decrementCartItem(cartItem) {
  return async dispatch => {
    cartItem.quantity = Math.max(cartItem.quantity - 1, 1)
    const res = await axios.put(`/api/orderItems/${cartItem.id}`, cartItem)
    dispatch(updateQuantity(res.data))
  }
}

export function setQuantityOfItem(cartItem) {
  return async dispatch => {
    const prod = await axios.get(`/api/products/${cartItem.productId}`)
    const max = prod.data.quantity
    cartItem.quantity = Math.min(Math.max(cartItem.quantity, 1), max)
    const res = await axios.put(`/api/orderItems/${cartItem.id}`, cartItem)
    dispatch(updateQuantity(res.data))
  }
}

export function convertCartToOrder(cart) {
  return async dispatch => {
    dispatch(clearCart(cart))
  }
}
