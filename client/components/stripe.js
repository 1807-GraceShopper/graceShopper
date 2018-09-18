import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import OrderSummary from './OrderSummary'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SingleOrder} from './SingleOrder'

const mapStateToProps = state => {
  return {
    singleOrder: state.orders.singleOrder,
    user: state.user
  }
}
class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      complete: false
    }
  }
  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    const newOrder = await this.props.createOrder({
      cart: this.props.cart,
      shipInfo: this.props.shippingInfo
    });
    let amount = 0
    this.props.cart.forEach(orderItem => {
      console.log('quantity', orderItem.quantity)
      console.log('price', orderItem.price)
      console.log('orderId', newOrder.id);
      let pid = 
      amount += 100 * (parseInt(orderItem.quantity) * parseInt(orderItem.price))
    })
    let response = await axios.post('/api/charges', {
      token: token.id,
      orderId: newOrder.id,
      amount: amount
    })
    if (response.statusText === 'OK') this.setState({complete: true})
  }

  render() {
    var style = {
      base: {
        color: '#303238',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#ccc'
        }
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238'
        }
      }
    }
    if (this.state.complete)
      return <OrderSummary order={this.props.singleOrder} />
    else
      return (
        <div className="checkout">
          <script src="https://js.stripe.com/v3/" />
          <p>Complete Purchase</p>
          <h6>
            Enter in your credit card information below to complete checkout
          </h6>
          <h3 />
          <CardElement style={style} />
          <button type="submit" onClick={this.submit}>
            Submit order
          </button>
        </div>
      )
  }
}

const ConnectedCheckoutForm = withRouter(connect(mapStateToProps)(CheckoutForm))

export default injectStripe(ConnectedCheckoutForm)
