// // lib/foodsModel.js

// import mongoose from 'mongoose';

// const foodsSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: String, required: true },
//     img_path: { type: String, required: true },
//     description: { type: String, required: true },
//     resto_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Restaurant' }
// });

// const Food = mongoose.models.Food || mongoose.model('Food', foodsSchema);

// export { Food as foodsSchemas };


import mongoose from 'mongoose';

const foodsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    img_path: { type: String, required: true },
    description: { type: String, required: true },
    resto_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
    category: { type: String, required: true }, // Add category field
});

const Food = mongoose.models.Food || mongoose.model('Food', foodsSchema);

export { Food as foodsSchemas };