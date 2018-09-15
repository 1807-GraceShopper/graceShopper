'use strict'

const chai = require('chai')
const expect = chai.expect

// Product Model

const db = require('../../../../server/db/models')
const Product = db.Product

describe('Product Model', () => {
  it('requires name', async () => {
    const product = Product.build({description: '', price: 0})
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
    const product = Product.build({
      name: '',
      price: 0
    })
    try {
      await product.validate()
      throw Error(
        'validation was successful but should have failed without `description`'
      )
    } catch (err) {
      expect(err.message).to.contain('description cannot be null')
    }
  })
  it('requires price', async () => {
    const product = Product.build({
      name: '',
      description: ''
    })
    try {
      await product.validate()
      throw Error(
        'validation was successful but should have failed without `price`'
      )
    } catch (err) {
      expect(err.message).to.contain('price cannot be null')
    }
  })
  it('price has a minimum value of 0', async () => {
    const product = Product.build({
      name: 'test',
      description: '',
      price: 2.0
    })
    try {
      await product.validate()
    } catch (err) {
      expect(err.message).to.contain(
        'Validation error: Validation min on price failed'
      )
    }
  })
})
