import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from './Footer';

const UserLogin = ({ onToggle,props }) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        let response = await fetch(`/api/user/login/`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        response = await response.json();
    
        if (response.status === "SUCCESS") { // Check for response.status
            alert("User Login successful");
            const { user } = response;
            delete user.password; // Remove password from user object
            localStorage.setItem("user", JSON.stringify(user)); // Store user data
            if (props?.redirect?.order) {
                router.push("/order");
            } else {
                router.push("/");
            }
        } else {
            alert(response.message); // Alert the message from the response
        }
    };
    

    return (
        <>
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
                <h2 className="text-3xl font-bold text-green-500 text-center mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4 w-full">
                    {/* Email Input */}
                    <div className="relative">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="block w-full pl-4 pr-4 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="block w-full pl-4 pr-4 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Toggle to Sign Up */}
                <div className="mt-4 text-center">
                    <p className="text-gray-500">Don't have an account? <a href="#" className="text-blue-500" onClick={onToggle}>Sign up</a></p>
                </div>
            </div>
        </div>
        </>
    );
};

export default UserLogin;
