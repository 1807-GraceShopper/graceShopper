const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

function requireLogin (req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('must be logged in')
  }
}

function requireAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json('must be an admin')
  }
}

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const category = await Category.findAll({
      where: {
        id: id
      },
      include: [{model: Product}]
    })
    res.json(category[0].dataValues.products)
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAdmin, async (req, res, next) => {
  try {
    res.json(
      await Category.create({
        name: req.body.name
      })
    )
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const update = await Category.update(
      {
        name: req.body.name
      },
      {
        returning: true,
        where: {id: req.params.id}
      }
    )
    res.json(update)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {id: req.params.id}
    })
    category.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
