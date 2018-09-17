const router = require('express').Router()
module.exports = router

const stripe = require('stripe')(process.env.STRIPE_KEY)

router.use(require('body-parser').text())

router.post('/', async (req, res) => {
	try {
		let {status} = await stripe.charges.create({
			amount: req.body.amount,
			currency: 'usd',
			description: 'An example charge',
			source: req.body.token
		})

		res.json({status})
	} catch (err) {
		res.status(500).end()
	}
})
