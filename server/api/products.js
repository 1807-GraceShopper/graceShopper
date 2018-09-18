const router = require('express').Router()
const {Product, Category, OrderItem, Review} = require('../db/models')
const {requireAdmin} = require('./validations')
module.exports = router

// all products route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: OrderItem}]
    })
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
      },
      include: [{model: Review}]
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAdmin, async (req, res, next) => {
  try {
    let newProduct
    if (req.body.photoUrl) {
      newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        photoUrl: req.body.photoUrl
      })
    } else {
      newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
      })
    }
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        photoUrl: req.body.photoUrl
      },
      {
        returning: true,
        where: {id: req.params.id}
      }
    )
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const productInfo = await Product.destroy({
      where: {id: req.params.id}
    })
    res.json(productInfo)
  } catch (error) {
    next(error)
  }
})
