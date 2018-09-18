'use strict'

import {
  User,
  Category,
  Order,
  Product,
  Review
} from '../../../../server/db/models'

const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

describe('User/Order associations', () => {
  let order1, order2, user1

  beforeEach(async () => {
    user1 = await User.create({
      id: 1,
      email: 'user@email.com',
      password: '123',
      isAdmin: false
    })
    order1 = await Order.create({
      id: 1,
      price: [12.34, 35.43, 15.38, 100.38],
      productId: [1, 2, 3],
      quantity: [2, 1, 1],
      timeOrdered: '1988-10-10 04:11:10',
      shippingAddress: '123 Fake Street, Chicago IL',
      email: 'test@email.com',
      userId: 1
    })
    order2 = await Order.create({
      id: 1,
      price: [32.34, 95.43, 12.38, 190.38],
      productId: [4, 2, 3],
      quantity: [2, 3, 1],
      timeOrdered: '1989-10-10 04:11:10',
      shippingAddress: '1002 New Street, Dallas TX',
      email: 'fake@email.com',
      userId: 1
    })
  })

  // describe('User', () => {
  //   it('should have associated orders', async () => {
  //     const result = await user1.hasOrders([order1, order2])
  //     // expect(result).to.be.true
  //   })
  // })
})
