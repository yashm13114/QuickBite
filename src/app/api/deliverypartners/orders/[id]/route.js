import { orderSchema } from "@/app/lib/ordersModel";
import { NextResponse } from 'next/server'; // Adjust the path as needed
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'; // If using MongoDB
import { connectionStr } from "@/app/lib/db";
import { foodsSchemas } from "@/app/lib/foodsModel";

export const GET = async(request) => {
    const userId = request.nextUrl.searchParams.get("id");
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await orderSchema.find({ deliveryBoy_Id: userId }); // Changed to fetch orders based on deliveryBoy_Id
    let success = false;

    if (result.length > 0) {
        let restoData = await Promise.all(
            result.map(async(item) => {
                let foodItems = await Promise.all(
                    item.foodItem_id.map(async(foodId) => {
                        return await foodsSchemas.findById(foodId); // Fetch food item details
                    })
                );

                let restoInfo = {
                    foodItems, // This will be an array of food items
                    amount: item.amount,
                    status: item.status,
                };

                return restoInfo;
            })
        );
        result = restoData;
        success = true;
    }

    return NextResponse.json({ result, success });
};