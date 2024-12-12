import { connectionStr } from "@/app/lib/db";
import { deliverypartnersSchema } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request, content) => {
    const city = content.params.city;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    console.log("Fetching delivery partners for city:", city); // Log city being queried
    const deliveryPartners = await deliverypartnersSchema.find({ city });
    return NextResponse.json({ result: deliveryPartners });
};