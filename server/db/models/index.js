const User = require('./User')
const Category = require('./Category')
const Order = require('./Order')
const Product = require('./Product')
const Review = require('./Review')
const OrderItem = require('./OrderItem')
const ShippingInfo = require('./ShippingInfo')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Category.belongsToMany(Product, {through: 'product_category', constraints: false})
Product.belongsToMany(Category, {through: 'product_category', constraints: false})

OrderItem.belongsTo(Product)
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)
Product.hasMany(OrderItem)

ShippingInfo.hasMany(Order, { foreignKey: { field: 'shippingInfoId', allowNull: false } });
Order.belongsTo(ShippingInfo)
ShippingInfo.belongsTo(User)
User.hasMany(ShippingInfo)

module.exports = {
  User,
  Category,
  Order,
  Product,
  Review,
  ShippingInfo,
  OrderItem
}
