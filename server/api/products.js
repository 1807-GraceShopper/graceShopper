const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// all products route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// single product route
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        id: req.params.id
      }
      // include: [{model: Review}]
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
