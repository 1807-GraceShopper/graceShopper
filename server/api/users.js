const router = require('express').Router()
const {User, ShippingInfo} = require('../db/models')
module.exports = router

function requireAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json('must be an admin')
  }
}

router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['email', 'isAdmin'],
      include: [{model: ShippingInfo}]
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

router.put('/:email', requireAdmin, async (req, res, next) => {
  try {
    const updatedUser = await User.update(
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
