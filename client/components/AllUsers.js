import React from 'react'
import {connect} from 'react-redux'
import {getUsersFromServer, deleteUserFromServer} from '../store/users'

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: () =>
    dispatch(getUsersFromServer()),
  deleteUser: (email) => dispatch(deleteUserFromServer(email))
})

export class AllUsers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    await this.props.getUsers()
    const users = this.props.users
    this.setState({
      users: users
    })
  }

  handleDelete (user) {
    this.props.deleteUser(user.email)
  }

  render() {
    if (this.props.users.users.length) {
      console.log('state', this.props)
      return (
        <div>
          <h3>All Users</h3>
          <ul>
            {this.props.users.users.map(user => {
              return (
                <li key={user.email}>
                  <div>
                    {user.email}
                    <button type="button" onClick={() => this.handleDelete(user)}>X</button>
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
