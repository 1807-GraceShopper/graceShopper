const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  timeOrdered: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Order
