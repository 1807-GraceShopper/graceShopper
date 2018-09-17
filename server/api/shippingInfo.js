const router = require('express').Router()
const {ShippingInfo, User} = require('../db/models')
const {requireLogin} = require('./validations')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allShippingInfo = await ShippingInfo.findAll()
    res.json(allShippingInfo)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const shippingInfo = await ShippingInfo.findById(req.params.id)
    res.json(shippingInfo)
  } catch (err) {
    next(err)
  }
})

router.get('/userShipping/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const shippingInfo = await ShippingInfo.findAll({
      where: {
        userId: userId
      },
      include: [{model: User}]
    })
    res.json(shippingInfo)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newShippingInfo
    if (req.user) {
      newShippingInfo = await ShippingInfo.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        region: req.body.region,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        userId: req.user.id
      })
    } else {
      newShippingInfo = await ShippingInfo.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        region: req.body.region,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
      })
    }
    res.json(newShippingInfo)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireLogin, async (req, res, next) => {
  try {
    const shippingInfoUpdate = await ShippingInfo.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        region: req.body.region,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
      },
      {
        returning: true,
        where: {id: req.params.id}
      }
    )
    res.json(shippingInfoUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireLogin, async (req, res, next) => {
  try {
    const shippingInfoToDestroy = await ShippingInfo.findById(req.params.id)
    shippingInfoToDestroy.destroy()
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})
