import { connectionStr } from "@/app/lib/db";
import { foodsSchemas } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export const GET = async(request, content) => {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodsSchemas.find({ resto_id: id });
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}
export const DELETE = async(request, content) => {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodsSchemas.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
        success = true
    }
    return NextResponse.json({ result, success })
}
export const PUT = async(request, content) => {
    const id = content.params.id;
    const body = await request.json(); // Parse the request body to get the updated data

    let success = false;
    let result = null;

    try {
        // Connect to the database
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Update the food item with the provided id using the data from the request body
        result = await foodsSchemas.updateOne({ _id: id }, { $set: body });

        // Check if the update was successful
        if (result.modifiedCount > 0) {
            success = true;
        }
    } catch (error) {
        console.error("Error updating the food item:", error);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
    }

    return NextResponse.json({ result, success });
}