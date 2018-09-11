'use strict'

const chai = require('chai')
const expect = chai.expect

// Product Model

const db = require('../server/db/models')
const Order = db.Order

describe('Order Model', () => {
  it('requires timeOrdered', async () => {
    const order = Order.build()
    try {
      await order.validate()
      throw Error(
        'validation was successful but should have failed without `timeOrdered`'
      )
    } catch (err) {
      expect(err.message).to.contain('timeOrdered cannot be null')
    }
  })
  it('requires shippingAddress', async () => {
    const order = Order.build()
    try {
      await order.validate()
      throw Error(
        'validation was successful but should have failed without `shippingAddress`'
      )
    } catch (err) {
      expect(err.message).to.contain('shippingAddress cannot be null')
    }
  })
  // it('requires email', async () => {
  //   const order = Order.build()
  //   try {
  //     await order.validate()
  //     throw Error(
  //       'validation was successful but should have failed without `email`'
  //     )
  //   } catch (err) {
  //     expect(err.message).to.contain('email cannot be null')
  //   }
  // })
})
