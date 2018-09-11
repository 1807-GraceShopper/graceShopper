const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll()
		res.json(products)
	} catch (err) {
		next(err)
	}
})

// router.get('/category/:id', async (req, res, next) => {
// 	const id = req.params.id
// 	console.log('id', req.params.id)
// 	try {
// 		const prodByCategory = await Product.findAll()
// 		console.log('info here', prodByCategory)
// 		res.json(prodByCategory)
// 	} catch (err) {
// 		next(err)
// 	}
// })
