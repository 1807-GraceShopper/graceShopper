import React from 'react'
import {connect} from 'react-redux'
import {
  getUsersFromServer,
  deleteUserFromServer,
  updateUserOnServer
} from '../store/users'

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: () =>
    dispatch(getUsersFromServer()),
  deleteUser: (email) => dispatch(deleteUserFromServer(email)),
  makeUserAnAdmin: (user) => dispatch(updateUserOnServer(user, 'isAdmin')),
  triggerPasswordReset: (user) => dispatch(updateUserOnServer(user, 'passwordResetRequired'))
})

export class AllUsers extends React.Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.makeAdmin = this.makeAdmin.bind(this)
    this.triggerPasswordReset = this.triggerPasswordReset.bind(this)
  }

  async componentDidMount() {
    await this.props.getUsers()
  }

  handleDelete (user) {
    this.props.deleteUser(user.email)
  }

  makeAdmin (user) {
    this.props.makeUserAnAdmin(user)
  }

  triggerPasswordReset (user) {
    this.props.triggerPasswordReset(user)
  }

  render() {
    if (this.props.users.users.length) {
      return (
        <div>
          <h3>All Users</h3>
          <ul>
            {this.props.users.users.map(user => {
              return (
                <li key={user.email}>
                  <div>
                    {user.email}
                    <button type="button" onClick={() => this.handleDelete(user)}>Delete</button>
                    <button type="button" onClick={() => this.makeAdmin(user)}>Make admin</button>
                    <button type="button" onClick={() => this.triggerPasswordReset(user)}>Trigger password reset</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else { return (
      <h3>Sorry, you are not authorized to view this page</h3>
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
