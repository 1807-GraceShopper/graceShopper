const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const categories = await Category.findAll()
		res.json(categories)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	const id = req.params.id
	try {
		const category = await Category.findAll({
			where: {
				id: id
			},
			include: [{model: Product}]
		})
		console.log('products', category[0].dataValues.products)
		res.json(category[0].dataValues.products)
	} catch (error) {
		next(error)
	}
})
