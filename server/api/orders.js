const router = require('express').Router()
const {Order, OrderItem, ShippingInfo} = require('../db/models')
const {requireAdmin} = require('./validations')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: OrderItem}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  const id = req.params.orderId
  try {
    const order = await Order.findById(id, {
      include: [{model: OrderItem}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(
      {
        timeOrdered: Date.now(),
        orderItems: req.body.cart,
        shippingInfo: req.body.shipInfo
      },
      {
        include: [OrderItem, ShippingInfo]
      }
    )
    newOrder.price = req.params.cart.reduce(function(accumulator, currentItem) {
      return accumulator + currentItem.price * currentItem.quantity
    }, 0)
    newOrder.quantity = req.params.cart.reduce(function(
      accumulator,
      currentItem
    ) {
      return accumulator + currentItem.quantity
    },
    0)
    await newOrder.save()
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', requireAdmin, async (req, res, next) => {
  try {
    const orderUpdate = await Order.update(
      {
        price: req.body.price,
        quantity: req.body.quantity,
        timeOrdered: req.body.timeOrdered
      },
      {
        returning: true,
        where: {id: req.params.orderId}
      }
    )
    res.json(orderUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', requireAdmin, async (req, res, next) => {
  try {
    const orderToDestroy = await Order.findById(req.params.orderId)
    orderToDestroy.destroy()
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})
