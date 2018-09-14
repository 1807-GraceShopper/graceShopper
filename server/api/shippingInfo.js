const router = require('express').Router()
const {ShippingInfo} = require('../db/models')
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

router.post('/', async (req, res, next) => {
  try {
    const newShippingInfo = await ShippingInfo.create({
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
    res.json(newShippingInfo)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  try {
    const shippingInfoToDestroy = await ShippingInfo.findById(req.params.id)
    shippingInfoToDestroy.destroy()
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})
