import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async() => {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const data = await Restaurant.find();
    console.log(data);
    return NextResponse.json({ result: data });
};
export const POST = async(request) => {
    let payload = await request.json();
    let success = false;
    let result = null; // Initialize result variable

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    if (payload.login) {
        // Attempt to find the restaurant with the provided email and password
        result = await Restaurant.findOne({
            email: payload.email,
            password: payload.password,
        });
        if (result) {
            success = true;
        }
    } else {
        // Create a new restaurant instance and save
        const restaurant = new Restaurant({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            city: payload.city,
            address: payload.address,
            contact: payload.contact,
            image: payload.image, // Ensure image is saved
        });

        result = await restaurant.save();
        if (result) {
            success = true;
        }
    }

    return NextResponse.json({ result, success });
};
// export const POST = async(request) => {
//     let payload = await request.json();
//     let result;
//     let success = false
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });
//     if (payload.login) {
//         result = await Restaurant.findOne({ email: payload.email, password: payload.password })
//         if (result) {
//             success = true
//         }
//     } else {
//         const restaurant = new Restaurant(payload);
//         result = await restaurant.save();
//         if (result) {
//             success = true
//         }
//     }
//     return NextResponse.json({ result, success: true });
// };


// pages/api/restaurant.js