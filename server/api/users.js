const router = require('express').Router()
const {User, ShippingInfo, Order, Review} = require('../db/models')
const {requireAdmin} = require('./validations')
module.exports = router

router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['email', 'isAdmin', 'passwordResetRequired'],
      include: [{model: ShippingInfo}, {model: Order}, {model: Review}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:email', requireAdmin, async (req, res, next) => {
  try {
    const userInfo = await User.destroy({
      where: {email: req.params.email}
    })
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
})

router.put('/updatePassword', async (req, res, next) => {
  try {
    if (req.user.email === req.body.user.email) {
      const userToUpdate = await User.findOne({
        where: {email: req.body.user.email}
      })
      const updatedPassword = await userToUpdate.update(
        {
          password: req.body.password,
          passwordResetRequired: false
        },
        {
          returning: true
        }
      )
      res.json(updatedPassword)
    } else {
      res.send('Status unauthorized')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:email', requireAdmin, async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      returning: true,
      where: {email: req.params.email}
    })
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
