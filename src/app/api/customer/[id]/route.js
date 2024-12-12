import { connectionStr } from "@/app/lib/db";
import { foodsSchemas } from "@/app/lib/foodsModel";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request, content) => {
    console.log(content.params.id)
    const id = content.params.id
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const details = await Restaurant.findOne({ _id: id })
    const foodItems = await foodsSchemas.find({ resto_id: id })
    return NextResponse.json({ success: true, details, foodItems });
};