'use strict'

const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// Product Model

const db = require('../server/db/models/')
const Product = db.Product

describe('Product Model', () => {
  it('requires name', async () => {
    const product = Product.build()
    try {
      await product.validate()
      throw Error(
        'validation was successful but should have failed without `name`'
      )
    } catch (err) {
      expect(err.message).to.contain('name cannot be null')
    }
  })
  it('requires description', async () => {
    const product = Product.build()
    try {
      await product.validate()
      throw Error(
        'validation was successful but should have failed without `description`'
      )
    } catch (err) {
      expect(err.message).to.contain('description cannot be null')
    }
  })
  // it('price has a minimum value of 0', () => {
  //   const product = Product.build({
  //     name: '',
  //     description: '',
  //     price: -3
  //   })
  //   expect(product.price).to.equal(0)
  // })
})
