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
    let amount = newOrder.order.price*100;
    let response = await axios.post('/api/charges', {
      token: token.id,
      orderId: newOrder.order.id,
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
          <br />
          <div className="ui one column stackable center aligned page grid">
          <button className="ui green basic small button" type="submit" onClick={this.submit}>
            Submit order
          </button>
          </div>
        </div>
      )
  }
}

const ConnectedCheckoutForm = withRouter(connect(mapStateToProps)(CheckoutForm))

export default injectStripe(ConnectedCheckoutForm)
