// import { connectionStr } from "@/app/lib/db";
// import { userSchema } from "@/app/lib/userMode";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export const POST = async(request) => {
//     const payload = await request.json();
//     let success = false;
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });
//     const user = new userSchema(payload);
//     const result = await user.save();
//     if (result) {
//         success = true;
//     }
//     return NextResponse.json({ result, success });
// };

import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db"; // Ensure this is correct
import User from "@/app/lib/userMode"; // Importing the User model
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { NextResponse } from "next/server";
import UserVerification from "@/app/lib/userVerificationModel";

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'yashm13114@gmail.com',
        pass: 'pkwbruokbahvijda', // Use environment variables for production
    },
});

// Email verification function
const sendVerificationEmail = async(user) => {
    const currentUrl = 'http://localhost:3000/';
    const uniqueString = uuidv4() + user._id;

    const mailOptions = {
        from: 'yashm13114@gmail.com',
        to: user.email,
        subject: "Verify your email",
        html: `<p>Verify your email address to complete the signup process.</p>
       <p>This link expires in 6 hours.</p>
       <p>Click <a href="${currentUrl}/api/verify/${user._id}/${uniqueString}">here</a> to verify your account.</p>`,

    };

    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

    const verification = new UserVerification({
        userId: user._id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000, // 6 hours
    });

    try {
        await verification.save();
        await transporter.sendMail(mailOptions);
        return { status: "PENDING", message: "Verification email sent" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { status: "FAILED", message: "Verification email failed" };
    }
};

// Signup Route
export const POST = async(request) => {
    const { name, email, password, city, address, mobileNumber } = await request.json();

    console.log(name, email, password, city, address, mobileNumber);

    // Check if all required fields are present
    if (!name || !email || !password || !city || !address || !mobileNumber) {
        return NextResponse.json({ status: "FAILED", message: "Fill all input fields" });
    }

    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ status: "FAILED", message: "User already exists" });
        }

        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the verified field set to false
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            city,
            address,
            mobileNumber,
            verified: false, // Default value
            verifyToken: uuidv4() // Assuming you want a unique token for verification
        });
        console.log("User data before save:", newUser); // <-- Check if fields are present here
        const savedUser = await newUser.save();


        // Send verification email
        const emailResponse = await sendVerificationEmail(newUser);

        return NextResponse.json(emailResponse);
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ status: "FAILED", message: "Internal Server Error" });
    }

};