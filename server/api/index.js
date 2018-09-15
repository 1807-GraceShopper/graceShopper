const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./category'))
router.use('/orders', require('./orders'))
router.use('/orderItems', require('./orderItems'))
router.use('/shippingInfo', require('./shippingInfo'))
router.use('/reviews', require('./reviews'))
router.use('/charges', require('./charges'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
