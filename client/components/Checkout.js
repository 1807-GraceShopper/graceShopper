import React from 'react'
import Stripe from './stripe'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {createOrderInServer} from '../store/orders'

const mapDispatchToProps = dispatch => ({
  createOrder: cart => dispatch(createOrderInServer(cart))
})

const mapStateToProps = state => ({
  cart: state.cart,
  shippingInfo: state.shippingInfo.currentOrderShipInfo
})

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_60MttfQL0IrqlSlDlbmt4J24">
          <Elements>
            <Stripe
              cart={this.props.cart}
              createOrder={this.props.createOrder}
              shippingInfo={this.props.shippingInfo}
            />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
