


// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const UserSignUp = ({ onToggle }) => {
//     const router = useRouter();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [ConfirmPassword, setConfirmPassword] = useState("");
//     const [city, setCity] = useState("");
//     const [address, setAddress] = useState("");
//     const [mobile, setMobile] = useState("");

//     const handleSignUp = async () => {
//         let response = await fetch("http://localhost:3000/api/user/", {
//             method: 'POST',
//             body: JSON.stringify({ email, password, name, city, address, mobile }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             }
//         });
//         response = await response.json();

//         if (response.success) {
//             alert("User signup successful");
//             const { result } = response;
//             delete result.password;
//             localStorage.setItem("user", JSON.stringify(result));
//             if (props?.redirect?.order) {
//                 router.push("/order");
//             } else {
//                 router.push("/");
//             }
//         } else {
//             alert("Signup failed");
//         }
//     }

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-black relative">
//             {/* Background Image */}
//             <div className="absolute inset-0">
//                 <img
//                     src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                     alt="Food"
//                     className="w-full h-full object-cover opacity-80"
//                 />
//             </div>

//             {/* Right side form */}
//             <div className="relative z-10 w-full md:w-1/2 lg:w-2/5 flex items-center justify-center px-6 py-6">
//                 <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg bg-opacity-80">
//                     <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
//                         Welcome to <span className="text-green-500">FoodMood!</span>
//                     </h2>
//                     <p className="text-gray-500 text-center mb-6">Sign up with your personal details</p>

//                     {/* Form Fields */}
//                     <div className="space-y-3">
//                         <input 
//                             type="text" 
//                             value={name} 
//                             onChange={(e) => setName(e.target.value)} 
//                             placeholder="Your name" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                         <input 
//                             type="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                             placeholder="Email" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                         <input 
//                             type="password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                             placeholder="Password" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                         <input 
//                             type="password" 
//                             value={ConfirmPassword} 
//                             onChange={(e) => setConfirmPassword(e.target.value)} 
//                             placeholder="Confirm Password" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                         <input 
//                             type="text" 
//                             value={city} 
//                             onChange={(e) => setCity(e.target.value)} 
//                             placeholder="City" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                         <input 
//                             type="text" 
//                             value={address} 
//                             onChange={(e) => setAddress(e.target.value)} 
//                             placeholder="Address" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                         <input 
//                             type="text" 
//                             value={mobile} 
//                             onChange={(e) => setMobile(e.target.value)} 
//                             placeholder="Mobile" 
//                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
//                         />
//                     </div>

//                     {/* Sign Up Button */}
//                     <div className="mt-6">
//                         <button 
//                             onClick={handleSignUp} 
//                             className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
//                         >
//                             Create Account
//                         </button>
//                     </div>

//                     {/* Toggle to Login */}
//                     <div className="mt-6 text-center">
//                         <p className="text-gray-500">Already a member? <a href="#" className="text-blue-500" onClick={onToggle}>Sign in</a></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserSignUp;
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserSignUp = ({ onToggle }) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState(""); // State to hold error message

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return re.test(String(email).toLowerCase());
    };

    const validateMobile = (mobile) => {
        const re = /^\d{10}$/; // Adjust regex based on expected mobile format
        return re.test(String(mobile));
    };

    const handleSignUp = async () => {
        // Reset error message
        setError("");
        console.log({ name, email, password, city, address, mobile });
        // Check for empty fields
        if (!name || !email || !password || !confirmPassword || !city || !address || !mobile) {
            setError("All fields are required.");
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Validate mobile number
        if (!validateMobile(mobile)) {
            setError("Mobile number must be 10 digits.");
            return;
        }

        // Proceed with signup
        let response = await fetch("/api/user/", {
            method: 'POST',
            body: JSON.stringify({ 
                email, 
                password, 
                name, 
                mobileNumber: mobile, 
                city, 
                address 
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const responseData = await response.json();
        console.log(responseData); 

        if (responseData.status === "PENDING") {
            alert("Sign-up successful! Please verify your email to complete the process.");
        // Redirect to verification pending page
        } else {
            setError(responseData.message || "Signup failed"); // Set error message
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-black relative">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Food"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            <div className="relative z-10 w-full md:w-1/2 lg:w-2/5 flex items-center justify-center px-6 py-6">
                <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg bg-opacity-80">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                        Welcome to <span className="text-green-500">QuickBite!</span>
                    </h2>
                    <p className="text-gray-500 text-center mb-6">Sign up with your personal details</p>
                    
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}

                    <div className="space-y-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
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
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Mobile"
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
                        <p className="text-gray-500">Already a member? <a href="#" className="text-blue-500" onClick={onToggle}>Sign in</a></p>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default UserSignUp;


