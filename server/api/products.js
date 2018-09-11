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
