const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  price: Sequelize.INTEGER,
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = OrderItem
