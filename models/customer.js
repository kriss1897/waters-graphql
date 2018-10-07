'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    
  };
  return Customer;
};