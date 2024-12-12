import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodsSchemas } from "../../../lib/foodsModel";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        const payload = await request.json();
        let success = false;
        // Connect to the database
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(connectionStr, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }

        // Ensure payload contains resto_id
        if (!payload.resto_id) {
            return NextResponse.json({ success: false, message: "resto_id is required" }, { status: 400 });
        }

        // Create a new food item
        const food = new foodsSchemas(payload);

        // Save the food item to the database
        const result = await food.save();
        if (result) {
            success = true
        }
        // Return the result
        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("Error adding food item:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
};