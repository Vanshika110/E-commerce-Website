const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const { Cart, CartItem } = require('./Cart');

// Define associations
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem
};
