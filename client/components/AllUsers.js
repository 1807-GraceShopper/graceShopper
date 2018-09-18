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
          <br />
          <h2 className="ui one column stackable center aligned page grid">All Users</h2>
          <br />
          <br />
          <br />
            {this.props.users.users.map(user => {
              return (
                <div>
                  <div key={user.email}>
                    <h5 className="ui one column stackable center aligned page grid">Account: {user.email}</h5>
                    <br />
                    <br />
                    <div className="ui three column stackable center aligned page grid">
                    <button className="ui violet basic mini button" type="button" onClick={() => this.handleDelete(user)}>Delete</button>
                    <button className="ui violet basic mini button" type="button" onClick={() => this.makeAdmin(user)}>Make admin</button>
                    <button className="ui violet basic mini button" type="button" onClick={() => this.triggerPasswordReset(user)}>Trigger password reset</button>
                    </div>
                  </div>
                <br />
                <br />
                <br />
                </div>
              )
            })}
            <br />
        </div>
      )
    } else { return (
      <h3>Sorry, you are not authorized to view this page</h3>
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
