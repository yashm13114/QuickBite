import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export const POST = async(request) => {
//     const payload = await request.json();
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });
//     let success = false;
//     const orderobj = new orderSchema(payload);
//     const result = await orderobj.save();
//     if (result) {
//         success = true;
//     }
//     return NextResponse.json({ result, success });
// };
// export const POST = async(request) => {
//     const payload = await request.json();
//     console.log("Payload received for order:", payload); // Log incoming payload
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });

//     const orderobj = new orderSchema(payload);
//     const result = await orderobj.save();

//     return NextResponse.json({ result, success: !!result });
// };
export const POST = async(request) => {
    const payload = await request.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    // Ensure the quantity is passed in the payload
    const orderData = {
        user_id: payload.user_id,
        foodItem_id: payload.foodItem_id,
        resto_id: payload.resto_id,
        deliveryBoy_Id: payload.deliveryBoy_Id,
        status: payload.status,
        amount: payload.amount,
        quantity: payload.quantity // Store the quantity from the payload
    };

    const orderobj = new orderSchema(orderData);
    const result = await orderobj.save();

    return NextResponse.json({ result, success: !!result });
};

export const GET = async(request) => {
    const userId = request.nextUrl.searchParams.get("id");
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await orderSchema.find({ user_id: userId });
    let success = false;
    if (result) {
        let restoData = await Promise.all(
            result.map(async(item) => {
                let restoInfo = {};
                restoInfo.data = await Restaurant.findOne({ _id: item.resto_id });
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
            })
        );
        result = restoData;
        success = true;
    }
    return NextResponse.json({ result, success });
};