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
      // REVIEW: use HTTP status codes
      res.send('Status unauthorized')
    }
  } catch (error) {
    next(error)
  }
})


adminColumns= ['isAdmin', 'name', 'email']
guestColumns= ['name']
userColumns= ['name', 'email']

if (!req.user) {
  columns = guestColumns
}
else if (req.user&& req.user.isAdmin) {
  columns = adminColumns
}
else {
  columns = userColumns
}

propsToUpdate = _.pluck(req.body, columns)
User.update(propsToUpdate, { where: { id: req.body.id } })

router.put('/:email', requireAdmin, async (req, res, next) => {
  // REVIEW: smells like RPC
  try {
    const updatedUser = await User.update(
      req.body,
      {
        isAdmin: true
      },
      {
        returning: true,
        where: {email: req.params.email}
      }
    )
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
