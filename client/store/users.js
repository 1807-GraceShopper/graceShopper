import axios from 'axios'

const initialState = {users: []}

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

const getUsers = users => ({
  type: GET_USERS,
  users
})

const deleteUser = email => ({
  type: DELETE_USER,
  email
})

const updateUser = user => ({
  type: UPDATE_USER,
  user
})

const updatePassword = user => ({
  type: UPDATE_USER,
  user
})

export const getUsersFromServer = () => {
  return async dispatch => {
    const res = await axios.get('/api/users')
    dispatch(getUsers(res.data))
  }
}

export const deleteUserFromServer = email => {
  return async dispatch => {
    await axios.delete(`/api/users/${email}`)
    dispatch(deleteUser(email))
  }
}

export const updateUserOnServer = (user, attribute) => {
  return async dispatch => {
    const res = await axios.put(`/api/users/${user.email}`, {[attribute]: true})
    dispatch(updateUser(res.data[1][0]))
  }
}

export const updatePasswordOnServer = (user, password) => {
  return async dispatch => {
    const res = await axios.put('/api/users/updatePassword', {
      user: user,
      password: password
    })
    dispatch(updatePassword(res.data))
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
    case UPDATE_USER:
      const updatedUsers = state.users.map(
        user => (action.user.email === user.email ? action.user : user)
      )
      return {...state, users: updatedUsers}
    default:
      return state
  }
}

export default reducer
