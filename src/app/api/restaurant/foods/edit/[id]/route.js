import { connectionStr } from "@/app/lib/db";
import { foodsSchemas } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request, content) => {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodsSchemas.find({ _id: id });
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}