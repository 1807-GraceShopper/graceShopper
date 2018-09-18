import axios from 'axios'

const initialState = {products: [], singleProduct: {}}

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const SEARCH_PRODUCT = 'SEARCH_PRODUCT'

const DELETE_PRODUCT = 'DELETE_PRODUCT'

//Action creators
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const searchProduct = product => ({
  type: SEARCH_PRODUCT,
  product
})
const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
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

export const newProduct = product => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  }
}

export const updateProductToServer = updateInfo => {
  return async dispatch => {
    const {data} = await axios.put(`api/products/${updateInfo.id}`, updateInfo)
    dispatch(updateProduct(data[1][0]))
  }
}

export const deleteProductFromServer = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case UPDATE_PRODUCT:
      const updatedProducts = state.products.map(product => {
          return (action.product.id === product.id ? action.product : product)
        })
      return {...state, products: updatedProducts}
    case SEARCH_PRODUCT:
      return {...state, products: action.product}
    case DELETE_PRODUCT:
      const deleted = state.products.filter(product => {
        return product.id !== action.productId
      })
      return {...state, products: deleted}
    default:
      return state
  }
}

export default reducer
