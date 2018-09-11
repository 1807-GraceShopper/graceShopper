const router = require('express').Router()
module.exports = router
import { Product } from '../db/models/Product';

// single product route
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        id: req.params.id
      },
      // include: [{model: Review}]
    });
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
})

const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
