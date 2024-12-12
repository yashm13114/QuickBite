const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    address: String,
    contact: String,
    image: String, // New field for image URL
});

export const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);