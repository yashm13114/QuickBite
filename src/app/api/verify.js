// pages/api/verify.js
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db"; // Ensure this is correct
import User from "@/app/lib/userMode"; // Importing the User model
import UserVerification from "@/app/lib/userVerificationModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async(request, { params }) => {
    const { userId, uniqueString } = params; // Get the userId and uniqueString from the URL parameters

    try {
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the user verification record
        const verificationRecord = await UserVerification.findOne({ userId });

        if (!verificationRecord) {
            return NextResponse.json({ status: "FAILED", message: "Invalid verification link" });
        }

        // Check if the unique string matches and if it hasn't expired
        const match = await bcrypt.compare(uniqueString, verificationRecord.uniqueString);
        const isExpired = verificationRecord.expiresAt < Date.now();

        if (match && !isExpired) {
            // Update the user's verified status
            await User.updateOne({ _id: userId }, { verified: true });
            await UserVerification.deleteOne({ userId }); // Remove the verification record

            // Redirect to a success page
            return NextResponse.redirect('/verify-success');
        } else {
            return NextResponse.json({ status: "FAILED", message: "Verification link is invalid or has expired" });
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        return NextResponse.json({ status: "FAILED", message: "Internal Server Error" });
    } finally {
        mongoose.connection.close();
    }
};