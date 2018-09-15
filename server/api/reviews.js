const router = require('express').Router()
const {Review} = require('../db/models')
const {requireLogin} = require('./validations')

module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.productId
      }
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

router.post('/', requireLogin, async (req, res, next) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
      productId: req.body.productId
    })
    res.json(newReview)
  } catch (error) {
    next(error)
  }
})
