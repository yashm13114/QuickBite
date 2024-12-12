import { connectionStr } from "@/app/lib/db";
import User from "@/app/lib/userMode"; // Ensure this is the correct import for the User model
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ status: "FAILED", message: "Fill input fields" });
    }

    try {
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the user by email
        const user = await User.findOne({ email }); // Use the User model here
        if (!user) {
            return NextResponse.json({ status: "FAILED", message: "User not found" });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ status: "FAILED", message: "Invalid credentials" });
        }

        // Check if user is verified
        if (!user.verified) {
            return NextResponse.json({ status: "FAILED", message: "Account not verified" });
        }

        return NextResponse.json({ status: "SUCCESS", message: "Login successful", user });
    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        return NextResponse.json({ status: "FAILED", message: "Login failed", error: error.message });
    }
};