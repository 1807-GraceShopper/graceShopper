const router = require('express').Router()
const {Order, OrderItem, ShippingInfo} = require('../db/models')
const {requireAdmin} = require('./validations')
const sendMail = require('../emails/emailSender')
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
      include: [{model: OrderItem}, {model: ShippingInfo}]
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
    const userId = req.user ? req.user.id : null
    const shipInfo = await ShippingInfo.findOne({
      where: {
        firstName: req.body.shipInfo.firstName,
        lastName: req.body.shipInfo.lastName,
        streetAddress: req.body.shipInfo.streetAddress,
        city: req.body.shipInfo.city,
        region: req.body.shipInfo.region,
        postalCode: req.body.shipInfo.postalCode,
        country: req.body.shipInfo.country,
        phoneNumber: req.body.shipInfo.phoneNumber,
        email: req.body.shipInfo.email
      }
    })
    const shipId = shipInfo.id
    const newOrder = await Order.create({
      timeOrdered: Date.now(),
      userId: userId,
      status: 'Created',
      shippingInfoId: shipId
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
  let created = {
    from: '"Kicks <graceShopper1807@gmail.com>',
    to: req.body.shipInfo.email,
    subject: 'Order Created',
    text: 'Order Created',
    html: '<h1>Order Created!</h1>'
  }
  sendMail(created)
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
  let updateStatus
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
    updateStatus = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: [{model: OrderItem}, {model: ShippingInfo}]
    })
    res.json(updateStatus)
  } catch (error) {
    next(error)
  }
  const processing = {
    from: '"Kicks <graceShopper1807@gmail.com>',
    to: updateStatus.shippingInfo.email,
    subject: 'Order Processing',
    text: 'Order Processing',
    html: '<h1>Order Processing</h1>'
  }
  const cancelled = {
    from: '"Kicks <graceShopper1807@gmail.com>',
    to: updateStatus.shippingInfo.email,
    subject: 'Order Cancelled',
    text: 'Order Cancelled',
    html: '<h1>Order Cancelled</h1>'
  }
  const completed = {
    from: '"Kicks <graceShopper1807@gmail.com>',
    to: updateStatus.shippingInfo.email,
    subject: 'Order Completed',
    text: 'Order Completed',
    html: '<h1>Order Completed</h1>'
  }
  switch (req.body.status) {
    case 'Processing':
      return sendMail(processing)
    case 'Cancelled':
      return sendMail(cancelled)
    case 'Completed':
      return sendMail(completed)
    default:
      return null
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
