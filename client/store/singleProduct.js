import axios from 'axios'

const initialState = {products: [], singleProduct: {}}

const GET_SINGLE_PRODUCT = 'GET_PRODUCT'

const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

// export const getSingleProduct = () => {
//   return async (dispatch) => {
//     const { data } = await axios.get('/api/products/id');
//     const action = getProduct(data);
//     dispatch(action);
//   }
// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}

export default reducer;
