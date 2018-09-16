import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

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
		let response = await axios.post('/api/charges', {
			token: token.id
		})
		console.log('cart', this.props.cart)
		console.log('ship', this.props.shippingInfo[0])
		this.props.createOrder({
			cart: this.props.cart,
			shipInfo: this.props.shippingInfo[0]
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
		if (this.state.complete) return <h4>Purchase Complete!</h4>
		else
			return (
				<div className="checkout">
					<script src="https://js.stripe.com/v3/" />
					<p>Complete Purchase</p>
					<h6>
						Enter in your credit card information below to complete
						checkout
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

export default injectStripe(CheckoutForm)
