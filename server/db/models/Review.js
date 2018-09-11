const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isWithinRange(value) {
        if (!(value.length >= 100 && value.length <= 2000)) {
          throw new Error('data not within range of 100 to 2000 characters')
        }
      }
    }
  }
})

module.exports = Review
