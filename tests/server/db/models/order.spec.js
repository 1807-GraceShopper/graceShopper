'use strict'

const chai = require('chai')
const expect = chai.expect

// Order Model

const db = require('../../../../server/db/models')
const Order = db.Order

describe('Order Model', () => {
  it('requires timeOrdered', async () => {
    const order = Order.build({
      price: [],
      productId: [],
      quantity: [],
      shippingAddress: '',
      email: 'test@email.com'
    })
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
    const order = Order.build({
      price: [],
      productId: [],
      quantity: [],
      timeOrdered: '1988-10-10 04:11:10',
      email: 'test@email.com'
    })
    try {
      await order.validate()
      throw Error(
        'validation was successful but should have failed without `shippingAddress`'
      )
    } catch (err) {
      expect(err.message).to.contain('shippingAddress cannot be null')
    }
  })
  it('requires email', async () => {
    const order = Order.build({
      price: [],
      productId: [],
      quantity: [],
      timeOrdered: '1988-10-10 04:11:10',
      shippingAddress: ''
    })
    try {
      await order.validate()
      throw Error(
        'validation was successful but should have failed without `email`'
      )
    } catch (err) {
      console.log('error for email', err.message);
      expect(err.message).to.contain('email cannot be null')
    }
  })
  it('requires email format with @ symbol', async () => {
    const order = Order.build({
      price: [],
      productId: [],
      quantity: [],
      timeOrdered: '1988-10-10 04:11:10',
      shippingAddress: '',
      email: 'testemail.com'
    })
    try {
      await order.validate()
      // throw Error('validation was successful but should have failed with an improperly formatted `email`')
    } catch (err) {
      expect(err.message).to.contain('email must be proper format')
    }
  })
})
