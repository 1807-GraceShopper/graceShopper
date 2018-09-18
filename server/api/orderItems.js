const router = require('express').Router()
const {OrderItem, Product } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll()
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const orderItem = await OrderItem.findById(id)
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const prod = await Product.findById(req.body.productId);
    const truePrice = prod.price;
    const newOrderItem = await OrderItem.create({
      productId: req.body.productId,
      price: truePrice,
      quantity: req.body.quantity
    })
    res.json(newOrderItem)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.update(
      {
        quantity: req.body.quantity
      },
      {
        returning: true,
        where: {id: req.params.id}
      }
    )
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id)
    orderItem.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
