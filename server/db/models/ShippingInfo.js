const Sequelize = require('sequelize')
const db = require('../db')

const ShippingInfo = db.define('shippingInfo', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postalCode: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = ShippingInfo
