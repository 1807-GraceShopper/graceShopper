'use strict'

const chai = require('chai')
const expect = chai.expect

// Order Model

const db = require('../../../../server/db/models')
const Order = db.Order
const ShippingInfo = db.ShippingInfo

describe('Order Model', () => {
  let shippingAddresses = [
    { firstName: 'Mogu', lastName: 'Barnes', streetAddress: '2090 Payne Street', city: 'Evanston', region: 'IL', postalCode: '60201', country: 'United States', email: 'mgbarnes@gmail.com' },
    { firstName: 'Heather', lastName: 'Madison', streetAddress: '3478 Ainsley Street', city: 'Chicago', region: 'IL', postalCode: '60225', country: 'United States', email: 'hmaddys@gmail.com' }
  ];
  beforeEach(async () => {
    await ShippingInfo.bulkCreate(shippingAddresses, {returning: true });
  })
  it('requires timeOrdered', async () => {
    const order = await Order.build({
      price: 250,
      quantity: 2,
      shippingInfoId: 1,
      status: 'Pending'
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
      price: 250,
      quantity: 2,
      timeOrdered: '1988-10-10 04:11:10',
      status: 'Pending'
    })
    try {
      await order.validate()
      throw Error(
        'validation was successful but should have failed without `shippingAddress`'
      )
    } catch (err) {
      expect(err.message).to.contain('shippingInfoId cannot be null')
    }
  })
})
