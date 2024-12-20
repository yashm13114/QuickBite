// import User from "@/app/lib/userMode"; // Ensure you are importing the model correctly
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";
// import UserVerification from "@/app/lib/userVerificationModel";

// const connectionStr = process.env.MONGODB_URI; // Ensure this is set in your environment variables

// export const GET = async(request, { params }) => {
//     const { userId, uniqueString } = params;

//     try {
//         await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

//         // Check if the verification record exists
//         const verificationRecord = await UserVerification.findOne({ userId });
//         if (!verificationRecord) {
//             console.error("No verification record found for userId:", userId);
//             return NextResponse.json({ status: "FAILED", message: "Invalid or expired link" });
//         }

//         const { expiresAt, uniqueString: hashedUniqueString } = verificationRecord;

//         // Check if the link is expired
//         if (Date.now() > expiresAt) {
//             console.warn("Link expired for userId:", userId);
//             await UserVerification.deleteOne({ userId });
//             await User.deleteOne({ _id: userId }); // Use User model to delete
//             return NextResponse.json({ status: "FAILED", message: "Link expired. Please sign up again" });
//         }

//         // Compare unique strings
//         const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);
//         if (!isMatch) {
//             console.error("Unique strings do not match for userId:", userId);
//             return NextResponse.json({ status: "FAILED", message: "Invalid verification link" });
//         }

//         // Verify the user
//         await User.updateOne({ _id: userId }, { verified: true }); // Use User model to update
//         await UserVerification.deleteOne({ userId });

//         return NextResponse.json({ status: "SUCCESS", message: "Email verified successfully" });
//     } catch (error) {
//         console.error("Verification failed with error:", error.message); // Log the error message
//         return NextResponse.json({ status: "FAILED", message: "Verification failed", error: error.message });
//     }
// };

import path from "path";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/app/lib/userMode";
import UserVerification from "@/app/lib/userVerificationModel";

const connectionStr = process.env.MONGODB_URI;

export const GET = async(request, { params }) => {
    const { userId, uniqueString } = params;

    try {
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        const verificationRecord = await UserVerification.findOne({ userId });
        if (!verificationRecord) {
            return NextResponse.json({ status: "FAILED", message: "Invalid or expired link" });
        }

        const { expiresAt, uniqueString: hashedUniqueString } = verificationRecord;

        if (Date.now() > expiresAt) {
            await UserVerification.deleteOne({ userId });
            await User.deleteOne({ _id: userId });
            return NextResponse.json({ status: "FAILED", message: "Link expired. Please sign up again" });
        }

        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (!isMatch) {
            return NextResponse.json({ status: "FAILED", message: "Invalid verification link" });
        }

        await User.updateOne({ _id: userId }, { verified: true });
        await UserVerification.deleteOne({ userId });

        // Serve the HTML page
        const filePath = path.join(process.cwd(), "public", "verified.html");
        const html = await fs.readFile(filePath, "utf8");
        return new Response(html, { headers: { "Content-Type": "text/html" } });
    } catch (error) {
        return NextResponse.json({ status: "FAILED", message: "Verification failed", error: error.message });
    }
};