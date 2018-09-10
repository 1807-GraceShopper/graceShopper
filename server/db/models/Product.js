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
		type: SEQUELIZE.FLOAT,
		validate: {
			min: 0
		}
	}
})

module.exports = Product
