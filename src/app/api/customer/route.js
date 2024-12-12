import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export const GET = async(request) => {
//     let queryParams = request.nextUrl.searchParams;
//     let filter = {};
//     if (queryParams.get("location")) {
//         let city = queryParams.get("location");
//         filter = { city: { $regex: new RegExp(city, "i") } };
//     } else if (queryParams.get("restaurant")) {
//         let name = queryParams.get("restaurant");
//         filter = { name: { $regex: new RegExp(name, "i") } };
//     }
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });
//     let result = await Restaurant.find(filter);
//     return NextResponse.json({ success: true, result });
// };


export const GET = async(request) => {
    const queryParams = request.nextUrl.searchParams;
    let filter = {};

    if (queryParams.get("location")) {
        const city = queryParams.get("location");
        filter.city = { $regex: new RegExp(city, "i") };
    }
    if (queryParams.get("restaurant")) {
        const name = queryParams.get("restaurant");
        filter.name = { $regex: new RegExp(name, "i") };
    }
    if (queryParams.get("category")) {
        const category = queryParams.get("category");
        filter.category = { $regex: new RegExp(category, "i") };
    }

    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await Restaurant.find(filter);
    return NextResponse.json({ success: true, result });
};