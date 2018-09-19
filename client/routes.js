import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  AddProduct,
  EditProduct,
  AllUsers,
  EditCategory,
  AddCategory,
  PasswordFormRedux,
  CartView,
  AddShippingInfo,
  AllUserOrders,
  OrderAdmin,
  Checkout,
  SingleOrder,
  EditShippingInfo
} from './components'
import {me} from './store'
import {fetchCartFromStorage} from './store/cart'
import {getProductsFromServer} from './store/product'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchCart()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/checkout" component={Checkout} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/editShippingInfo" component={EditShippingInfo} />
        <Route path="/shippingInfo" component={AddShippingInfo} />
        <Route path="/orderAdmin" component={OrderAdmin} />
        <Route exact path="/orders" component={AllUserOrders} />
        <Route path="/orders/:id" component={SingleOrder} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/product/editProduct/:id" component={EditProduct} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/product/addProduct" component={AddProduct} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route exact path="/users" component={AllUsers} />
        <Route path="/users/updatePassword" component={PasswordFormRedux} />
        <Route path="/categories/" component={EditCategory} />
        <Route path="/addCategory/" component={AddCategory} />
        <Route path="/cart" component={CartView} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  const {cart} = state
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    cart
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(me())
    dispatch(getProductsFromServer())
  },
  fetchCart: () => {
    dispatch(fetchCartFromStorage())
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
