'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    customerId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    price: DataTypes.INTEGER,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    
  };
  return Order;
};