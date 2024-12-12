// import mongoose from "mongoose";

// // Define the user schema
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please enter your Name"],
//     },
//     email: {
//         type: String,
//         required: [true, "Please enter your Email"],
//         unique: true, // Ensuring that emails are unique
//         lowercase: true,
//         trim: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Please enter your Password"],
//     },
//     city: { type: String, required: true }, // Add this if missing
//     address: { type: String, required: true },
//     mobileNumber: {
//         type: String,
//         required: [true, "Please enter your Phone Number"],
//     },
//     verified: {
//         type: Boolean,
//         default: false, // Default to false until verified
//     },
//     verifyToken: {
//         type: String,
//         required: true, // Assuming you want this to be required for creating a user
//     },
// });

// // Export the user model, ensuring that we only create one model for 'User'
// const User = mongoose.models.User || mongoose.model("User", userSchema);
// export default User;
// Example userMode.js schema configuration
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String, // Include city field
    address: String, // Include address field
    mobileNumber: String, // Include mobileNumber field
    verified: Boolean,
    verifyToken: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;