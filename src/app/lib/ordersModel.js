const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    foodItem_id: [String],
    resto_id: mongoose.Schema.Types.ObjectId,
    deliveryBoy_Id: mongoose.Schema.Types.ObjectId,
    status: String,
    amount: String
});

export const orderSchema = mongoose.models.orders || mongoose.model('orders', orderModel);