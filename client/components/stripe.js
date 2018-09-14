import React from 'react'

const Checkout = props => {
	return (
		<form>
			<script
				src="https://checkout.stripe.com/checkout.js"
				class="stripe-button"
				data-key="pk_test_60MttfQL0IrqlSlDlbmt4J24"
				data-amount="999"
				data-name="Stripe.com"
				data-description="Widget"
				data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
				data-locale="auto"
				data-zip-code="true"
			>
				Shipping info: <input type="text" />
			</script>
		</form>
	)
}

export default Checkout
