const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: String,
    price: Number,
    customerId: String,
    status: String,
    address: String
});

module.exports = mongoose.model('Order', orderSchema)