import axios from 'axios';

const initialState = {users: []}

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const MAKE_USER_ADMIN = 'MAKE_USER_ADMIN'

const getUsers = users => ({
  type: GET_USERS,
  users
})

const deleteUser = email => ({
  type: DELETE_USER,
  email
})

const makeAdmin = user => ({
  type: MAKE_USER_ADMIN,
  user
})

export const getUsersFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/users')
    dispatch(getUsers(res.data))
  }
}

export const deleteUserFromServer = (email) => {
  return async dispatch => {
    await axios.delete(`/api/users/${email}`)
    dispatch(deleteUser(email))
  }
}

export const makeAdminOnServer = (email, user) => {
  return async dispatch => {
    const res = await axios.put(`/api/users/${email}`, user)
    console.log('newUser', res.data[1][0])
    dispatch(makeAdmin(res.data[1][0]))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    case DELETE_USER:
      const deleted = state.users.filter(user => {
        return user.email !== action.email
      })
      return {...state, users: deleted}
    case MAKE_USER_ADMIN:
      const updatedUsers = state.users.map(user =>
        action.user.email === user.email ? action.user : user
      )
      return {...state, users: updatedUsers}
    default:
      return state
  }
}

export default reducer
