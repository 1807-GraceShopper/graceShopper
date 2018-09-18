import axios from 'axios'

const initalState = {shippingInfo: [], currentOrderShipInfo: {}}

//Action types
const GET_SHIPPING_INFO = 'GET_SHIPPING_INFO'
const GET_SINGLE_SHIPPING_INFO = 'GET_SINGLE_SHIPPING_INFO'
const ADD_SHIPPING_INFO = 'ADD_SHIPPING_INFO'
const UPDATE_SHIPPING_INFO = 'UPDATE_SHIPPING_INFO'
const DELETE_SHIPPING_INFO = 'DELETE_SHIPPING_INFO'
const GET_SHIPPING_BY_USER = 'GET_SHPPING_BY_USER'

//Action creators
const getShippingInfo = shippingInfo => ({
  type: GET_SHIPPING_INFO,
  shippingInfo
})

const getSingleShippingInfo = singleShippingInfo => ({
  type: GET_SINGLE_SHIPPING_INFO,
  singleShippingInfo
})

const getShippingInfoByUser = shippingInfo => ({
  type: GET_SHIPPING_BY_USER,
  shippingInfo
})

const addShippingInfo = singleShippingInfo => ({
  type: ADD_SHIPPING_INFO,
  singleShippingInfo
})

const updateShippingInfo = singleShippingInfo => ({
  type: UPDATE_SHIPPING_INFO,
  singleShippingInfo
})

const deleteShippingInfo = singleShippingInfoId => ({
  type: DELETE_SHIPPING_INFO,
  singleShippingInfoId
})

//Thunks

export const getShippingInfoFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/shippingInfo')
    dispatch(getShippingInfo(res.data))
  }
}

export const getSingleShippingInfoFromServer = id => {
  return async dispatch => {
    const res = await axios.get(`api/shippingInfo/${id}`)
    dispatch(getSingleShippingInfo(res.data))
  }
}

export const getShippingInfoByUserServer = userId => {
  return async dispatch => {
    const userShipping = await axios.get(
      `/api/shippingInfo/userShipping/${userId}`
    )
    dispatch(getShippingInfoByUser(userShipping.data))
  }
}

export const addShippingInfoToServer = singleShippingInfo => {
  return async dispatch => {
    const res = await axios.post('api/shippingInfo', singleShippingInfo)
    dispatch(addShippingInfo(res.data))
  }
}

//come back to update for the [1][0] add to res.data if necessary
export const updateShippingInfoInServer = singleShippingInfo => {
  return async dispatch => {
    const res = await axios.put(
      `api/shippingInfo/${singleShippingInfo.id}`,
      singleShippingInfo
    )
    dispatch(updateShippingInfo(res.data))
  }
}

export const deleteProductFromServer = singleShippingInfoId => {
  return async dispatch => {
    await axios.delete(`/api/products/${singleShippingInfoId}`)
    dispatch(deleteShippingInfo(singleShippingInfoId))
  }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_SHIPPING_INFO:
      return action.shippingInfo
    case GET_SINGLE_SHIPPING_INFO:
      return action.singleShippingInfo
    case GET_SHIPPING_BY_USER:
      return action.shippingInfo

    case ADD_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: [...state.shippingInfo, action.singleShippingInfo],
        currentOrderShipInfo: action.singleShippingInfo
      }
    case UPDATE_SHIPPING_INFO:
      const updatedShippingInfo = state.shippingInfo.map(
        singleShippingInfo =>
          action.singleShippingInfo.id === singleShippingInfo.id
            ? action.singleShippingInfo
            : singleShippingInfo
      )
      return {...state, shippingInfo: updatedShippingInfo}
    case DELETE_SHIPPING_INFO:
      const newShippingInfo = state.shippingInfo.filter(
        singleShippingInfo =>
          action.singleShippingInfoId !== singleShippingInfo.id
      )
      return {...state, shippingInfo: newShippingInfo}
    default:
      return state
  }
}

export default reducer
