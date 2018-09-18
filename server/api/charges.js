const router = require('express').Router()
const { Order } = require('../db/models');
module.exports = router

const stripe = require('stripe')(process.env.STRIPE_KEY)

router.use(require('body-parser').text())

router.post('/', async (req, res) => {
	try {
		const orid = req.body.orderId;
		const targetOrder = await Order.findById(orid);
		let orderPrice = targetOrder.price*100;
		if (orderPrice === req.body.amount) {
			let {status} = await stripe.charges.create({
				amount: req.body.amount,
				currency: 'usd',
				description: 'An example charge',
				source: req.body.token
			})

			res.json({status})
		}
		else {
			throw new Error("Validation Error");
		}
	} catch (err) {
		res.status(500).end()
	}
})
