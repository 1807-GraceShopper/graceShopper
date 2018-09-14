const router = require('express').Router()
const {Order, OrderItem, ShippingInfo} = require('../db/models')

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
    const shipInfo = await ShippingInfo.create(req.body.shippingInfo);
    const newOrder = await Order.create({
      price: req.body.price || 0, //req.body.cart.reduce() sum of the prices * quantities of 
      quantity: req.body.quantity || 0, //req.body.shippingInfo.reduce sum of quantities of items in cart
      timeOrdered: Date.now(),
      orderItems: req.body.cart,
      shippingInfo: shipInfo
    }, {
      include: [ OrderItem, ShippingInfo ]
    });
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
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

router.delete('/:orderId', async (req, res, next) => {
  try {
    const orderToDestroy = await Order.findById(req.params.orderId)
    orderToDestroy.destroy()
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})
