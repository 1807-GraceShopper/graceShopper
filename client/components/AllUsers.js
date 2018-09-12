import React from 'react'
import {connect} from 'react-redux'
import {getUsersFromServer, deleteUserFromServer} from '../store/users'
// import {NavLink} from 'react-router-dom'

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
      return (
        <div>
          <h3>All Users</h3>
          <ul>
            {this.props.users.users.map(user => {
              return (
                <li key={user.email}>
                  <div>
                    {user.email}
                  </div>
                  <button type="button" onClick={this.handleDelete(user)}>X</button>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else { return (
      <h3>Sorry, there are not currently any users</h3>
    )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
