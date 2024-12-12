import { connectionStr } from "@/app/lib/db";
import { foodsSchemas } from "@/app/lib/foodsModel";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export const GET = async() => {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await Restaurant.find();
    result = result.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1))
    return NextResponse.json({ success: true, result })
}