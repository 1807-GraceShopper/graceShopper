const router = require('express').Router()
const {Order, OrderItem, ShippingInfo} = require('../db/models')
const {requireAdmin} = require('./validations')
module.exports = router

// REVIEW: access control
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

router.get('/orderSummary/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const orders = await Order.findAll({
      where: {
        userId: userId
      },
      include: [{model: OrderItem}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/statuses/:status', async (req, res, next) => {
  const status = req.params.status
  try {
    let ordersByStatus
    if (status) {
      ordersByStatus = await Order.findAll({
        where: {
          status: status
        }
      })
    } else {
      ordersByStatus = await Order.findAll()
    }
    res.json(ordersByStatus)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('req body', req.body)
    const userId = req.user ? req.user.id : null
    const newOrder = await Order.create({
      timeOrdered: Date.now(),
      userId: userId,
      status: 'Created'
    })
    newOrder.price = req.body.cart.reduce(function(accumulator, currentItem) {
      return accumulator + currentItem.price * currentItem.quantity
    }, 0)
    newOrder.quantity = req.body.cart.reduce(function(
      accumulator,
      currentItem
    ) {
      return accumulator + currentItem.quantity
    },
    0)
    await newOrder.save()
    req.body.cart.forEach(async orderItem => {
      await OrderItem.update(
        {
          orderId: newOrder.id
        },
        {
          where: {
            id: orderItem.id
          }
        }
      )
    })
    await ShippingInfo.update(
      {
        orderId: newOrder.id
      },
      {
        where: {
          email: req.body.shipInfo.email
        }
      }
    )
    const updatedOrder = await Order.findOne({
      where: {
        id: newOrder.id
      },
      include: [{model: OrderItem}, {model: ShippingInfo}]
    })
    res.json(updatedOrder)
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

router.put('/status/:orderId', requireAdmin, async (req, res, next) => {
  try {
    await Order.update(
      {
        status: req.body.status
      },
      {
        where: {
          id: req.params.orderId
        }
      }
    )
    const updateStatus = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: [{model: OrderItem}]
    })
    console.log('update Status', updateStatus)
    res.json(updateStatus)
  } catch (error) {
    next(error)
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
