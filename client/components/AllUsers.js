import React from 'react'
import {connect} from 'react-redux'
import {
  getUsersFromServer,
  deleteUserFromServer,
  makeAdminOnServer
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
  makeUserAnAdmin: (email, user) => dispatch(makeAdminOnServer(email, user))
})

export class AllUsers extends React.Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.makeAdmin = this.makeAdmin.bind(this)
  }

  async componentDidMount() {
    await this.props.getUsers()
  }

  handleDelete (user) {
    this.props.deleteUser(user.email)
  }

  makeAdmin (email, user) {
    this.props.makeUserAnAdmin(email, user)
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
                    <button type="button" onClick={() => this.makeAdmin(user.email, user)}>Make admin</button>
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
