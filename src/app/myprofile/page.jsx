"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";

const Page = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"));
        setUserDetails(userStorage);
        getMyOrders(userStorage._id);
    }, []);

    const getMyOrders = async (userId) => {
        try {
            let response = await fetch(`http://localhost:3000/api/order?id=${userId}`);
            let data = await response.json();
            if (data.success) {
                setMyOrders(data.result);
                console.log(data.result)
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <>
            <div
                className="min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://img.freepik.com/free-photo/delicious-flexitarian-diet-arrangement-top-view_23-2148862677.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722643200&semt=ais_hybrid')",
                }}
            >
                <CustomerHeader />
                <div className="flex flex-col md:flex-row justify-between p-5 gap-5">
                    {/* User Details Section */}
                    <div className="w-full md:w-1/4 h-64 p-4 bg-white bg-opacity-80 rounded-lg shadow-lg mb-5 md:mb-0 flex flex-col items-center justify-center">
                        <h2 className="text-lg font-semibold mb-3">Profile Details</h2>

                        {/* Profile Image Box */}
                        <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                            {/* You can add the profile image here */}
                            <img className="h-auto w-auto rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg" alt="" />
                        </div>

                        <div className="text-center">
                            <p><strong>Name:</strong> {userDetails.name}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p><strong>Address:</strong> {userDetails.address}</p>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="w-full md:w-3/4 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg overflow-y-auto max-h-[500px]">
                        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

                        {myOrders.length > 0 ? (
                            <div className="space-y-4">
                                {myOrders.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-6 shadow-lg md:flex justify-between items-center min-w-[300px] md:min-w-[800px]"
                                    >
                                        <div className="flex items-center">
                                            {/* Order Image */}
                                            <img
                                                src={item?.data?.image || "https://via.placeholder.com/150"}
                                                alt={item?.data?.name || "Order image"}
                                                className="w-20 h-20 rounded-md object-cover mr-4"
                                            />
                                            {/* Order Info */}
                                            <div>
                                                <h2 className="text-xl font-semibold">{item?.data?.name || "Unknown Item"}</h2>
                                                <p>Price: Rs. {item?.amount || 0}</p>
                                            </div>
                                        </div>
                                        {/* Order Status */}
                                        <div className="mt-4 md:mt-0 text-right">
                                            Status: <p className="text-green-500 font-semibold">
                                                {item?.status === "confirmed" ? "Confirmed" : item?.status || "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No orders found.</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
