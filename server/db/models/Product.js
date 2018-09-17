const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'defaultShoe.png'
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  getterMethods: {
    inStock() {
      return this.quantity > 0;
    }
  }
});

module.exports = Product
