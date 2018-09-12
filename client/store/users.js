import axios from 'axios';

const initialState = {users: []}

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'

const getUsers = users => ({
  type: GET_USERS,
  users
})

const deleteUser = user => ({
  type: DELETE_USER,
  user
})

export const getUsersFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/users')
    dispatch(getUsers(res.data))
  }
}

export const deleteUserFromServer = (id) => {
  return async dispatch => {
    const res = await axios.delete(`/api/users/${id}`)
    dispatch(deleteUser(res.data))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    case DELETE_USER:
      const deleted = state.users.filter(user => {
        return user.id !== action.id
      })
      return {...state, users: deleted}
    default:
      return state
  }
}

export default reducer
