// File: api/deliverypartners/orders/[id].js (or similar)
import { orderSchema } from "@/app/lib/ordersModel";
// File: api/deliverypartners/orders/[id].js

import { NextResponse } from 'next/server'; // Adjust the path as needed
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'; // If using MongoDB

export const GET = async(request, { params }) => {
    const deliveryId = params.id;

    // Validate deliveryId
    if (!deliveryId || deliveryId.length !== 24) {
        console.error("Invalid deliveryId:", deliveryId);
        return NextResponse.json({ success: false, message: "Invalid delivery ID" }, { status: 400 });
    }

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    console.log("Fetching orders for delivery partner ID:", deliveryId); // Log delivery ID
    try {
        // Fetch orders for the specific delivery partner
        const result = await orderSchema.find({ deliveryBoy_id: new ObjectId(deliveryId) });

        console.log("Fetched orders:", result); // Log fetched orders

        if (!result || result.length === 0) {
            console.log("No orders found for delivery ID:", deliveryId);
            return NextResponse.json({ success: false, message: "No orders assigned to you." }, { status: 404 });
        }

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ success: false, message: "Error fetching orders" }, { status: 500 });
    }
};