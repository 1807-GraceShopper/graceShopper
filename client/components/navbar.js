import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <div className="ui one column stackable center aligned page grid">
      <h1 className="title">Solemate</h1>
    </div>
    <div className="ui one column stackable center aligned page grid">
      <h4 className="subtitle">a one-stop shop for all your favorite footwear</h4>
    </div>
    <br />
    <hr />
    <nav>
      {isLoggedIn ? (
        <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
        <div className="ui horizontal link list">
          {/* The navbar will show these links after you log in */}
          <div className="active item"><Link to="/home">Home</Link></div>
          <div className="item"><Link to="/products">All Products</Link></div>
          <div className="item"><Link to="/cart">My Cart</Link></div>
          <div className="item"><Link to="/orders">My Orders</Link></div>
          <div className="item"><a href="#" onClick={handleClick}>
            Logout
          </a></div>
        </div>
        </div>
        </div>
      ) : (
        <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
        <div className="ui horizontal link list">
          {/* The navbar will show these links before you log in */}
          <div className="item"><Link to="/login">Login</Link></div>
          <div className="item"><Link to="/signup">Sign Up</Link></div>
          <div className="item"><Link to="/cart">View Cart</Link></div>
          <div className="item"><Link to="/products">All Products</Link></div>
        </div>
        </div>
        </div>
      )}
      <br />
      {isAdmin ?
      <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
      <div className="ui horizontal link list">
      <div className="item"><Link to="/orderAdmin">Order Admin</Link></div>
      <div className="item"><Link to="/users">User Admin</Link></div>
      </div>
      </div>
      </div>
      : ''}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
