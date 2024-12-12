const mongoose = require("mongoose");

const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    city: String,
    address: String,
});

export const deliverypartnersSchema = mongoose.models.deliverypartners || mongoose.model('deliverypartners', deliveryPartnersModel);