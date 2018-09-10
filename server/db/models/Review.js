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
			min: {
				args[100]
			},
			max: {
				args[2000]
			}
		}
	}
})

module.exports = Review
