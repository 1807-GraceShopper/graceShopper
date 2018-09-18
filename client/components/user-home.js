import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin, passwordResetRequired} = props

  if (passwordResetRequired) {
    props.history.push('/users/updatePassword');
  }
  else if (isAdmin) {
    return (
      <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
          <h3>Welcome, {email}</h3>
        </div>
      </div>
    )
  }
  return (
    <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
        <h3>Welcome, {email}</h3>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    passwordResetRequired: state.user.passwordResetRequired
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
