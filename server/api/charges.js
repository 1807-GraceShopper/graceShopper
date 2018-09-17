const router = require('express').Router()
module.exports = router

// REIVEW: no secrets in source
process.env.STRIPE_KEY
const stripe = require('stripe')('sk_test_FAFklG3QgMgYjgRTR2ysoEFE')

router.use(require('body-parser').text())


// REVIEW: this feels like it should have some more security around it
router.post('/', async (req, res) => {
	try {
		console.log(req.body.email, 'email')
		console.log('amount', req.body.amount)
		let {status} = await stripe.charges.create({
      //
			amount: req.body.amount,
			currency: 'usd',
			receipt_email: req.body.email,
			description: 'An example charge',
			source: req.body.token
		})

		res.json({status})
	} catch (err) {
    // REVIEW: better to send error into next
		res.status(500).end()
	}
})
