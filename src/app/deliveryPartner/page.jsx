"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DeliveryHeader from '../_components/deliveryHeader';

const Page = (props) => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
    const [loginmobile, setLoginMobile] = useState('');
    const [loginpassword, setLoginPassword] = useState('');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(()=>{
        const delivery = JSON.parse(localStorage.getItem("delivery"));
        if(delivery){
            router.push("deliveryDashboard")
        }
    },[])
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
            method: 'POST',
            body: JSON.stringify({ mobile: loginmobile, password: loginpassword }), // Use loginmobile and loginpassword
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        response = await response.json();

        if (response.success) {
            alert("User Login successful");
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            if (props?.redirect?.order) {
                router.push("/order");
            } else {
                router.push("/deliveryDashboard");
            }
        } else {
            alert("Login failed");
        }
    };

    const handleSignUp = async () => {
        let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
            method: 'POST',
            body: JSON.stringify({ password, name, city, address, mobile }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        response = await response.json();

        if (response.success) {
            alert("User signup successful");
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            router.push("deliveryDashboard");
        } else {
            alert("Signup failed");
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between Login and Signup form
    };

    return (
        <>
        <DeliveryHeader/>
            <div>
                <div className="min-h-screen flex justify-center items-center bg-black relative">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
                            alt="Food"
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>

                    {/* Centered Form */}
                    <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-lg shadow-lg w-96 flex flex-col items-center">
                        {isLogin ? (
                            <>
                                <h2 className="text-3xl font-bold text-green-500 text-center mb-6">Login</h2>
                                <form onSubmit={handleLogin} className="space-y-4 w-full">
                                    <div className="relative">
                                        <label htmlFor="email" className="sr-only">Phone Number</label>
                                        <input
                                            id="email"
                                            type="number"
                                            name="mobile"
                                            className="block w-full pl-4 pr-4 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Phone Number"
                                            value={loginmobile}
                                            onChange={(e) => setLoginMobile(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="block w-full pl-4 pr-4 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Password"
                                            value={loginpassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-4 text-center">
                                    <p className="text-gray-500">Don't have an account? <a href="#" className="text-blue-500" onClick={toggleForm}>Sign up</a></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                                    Welcome to <span className="text-green-500">FoodMood!</span>
                                </h2>
                                <p className="text-gray-500 text-center mb-6">Sign up with your personal details</p>

                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                    <input
                                        type="text"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="Mobile"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="City"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Address"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={handleSignUp}
                                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                                    >
                                        Create Account
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-gray-500">Already a member? <a href="#" className="text-blue-500" onClick={toggleForm}>Sign in</a></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
