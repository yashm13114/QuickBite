// import { connectionStr } from "@/app/lib/db";
// import { foodsSchemas } from "@/app/lib/foodsModel";
// import { Restaurant } from "@/app/lib/restaurantModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server"

// export const GET = async() => {
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });
//     let result = await Restaurant.find();
//     result = result.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1))
//     return NextResponse.json({ success: true, result })
// }\



import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";

export const GET = async() => {
    if (!connectionStr) {
        console.error("MONGODB_URI is undefined. Please check your environment variable.");
        return NextResponse.json({
            success: false,
            message: "Database connection string is missing.",
        });
    }

    try {
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        let result = await Restaurant.find();
        result = result.map(
            (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1)
        );
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({
            success: false,
            message: "Error connecting to the database.",
        });
    }
};