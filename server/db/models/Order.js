const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  price: Sequelize.ARRAY(Sequelize.STRING),
  productId: Sequelize.ARRAY(Sequelize.STRING),
  quantity: Sequelize.ARRAY(Sequelize.STRING),
  timeOrdered: {
    type: Sequelize.DATE,
    allowNull: false
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = Order
