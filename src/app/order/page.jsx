"use client";
import React, { useState, useEffect } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const OrderPage = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [salesTax, setSalesTax] = useState(0);
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")));
    const [total, setTotal] = useState(0);
    const [removeCartData, setRemovedartData] = useState(false);
    const taxRate = 0.10;
    const router = useRouter();
    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            const parsedCart = JSON.parse(cartData);
            setCartStorage(parsedCart);
            calculateTotals(parsedCart);
        }
    }, []);
    // useEffect(() => {
    //     if(!total){
    //         router.push("/")
    //     }
    // }, [total]);

    // const orderNow = async () => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     const cart = JSON.parse(localStorage.getItem("cart"));
        
    //     if (!cart || cart.length === 0) {
    //         alert("Your cart is empty.");
    //         return;
    //     }
    
    //     let user_id = user._id;
    //     let city = user.city;
    //     let foodItem_id = cart.map(item => item._id.toString());
    //     let resto_id = cart[0]?.resto_id; // Dummy ID or fetched based on city
    
    //     try {
    //         let deliveryBoyResponse = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
    //         deliveryBoyResponse = await deliveryBoyResponse.json();
    //         let deliveryBoyIds = deliveryBoyResponse.result.map(item => item._id);
    //         let deliveryBoyId = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

    //         console.log(deliveryBoyId)
    //         if(!deliveryBoyId){
    //             alert("Delivery boy not found");
    //             return false;
    //         }
    //         let collection = {
    //             user_id,
    //             resto_id,
    //             foodItem_id,
    //             deliveryBoy_Id: deliveryBoyId, // Use a valid delivery boy ID
    //             status: "confirm",
    //             amount: total
    //         };
    
    //         let response = await fetch("/api/order", {
    //             method: 'POST',
    //             body: JSON.stringify(collection),
    //             headers: { "Content-Type": "application/json" }
    //         });
    
    //         response = await response.json();
    
    //         if (response.success) {
    //             alert("Order Confirmed");
    //             router.push("/myprofile"); // Redirect after confirming the order
    //             setRemovedartData(true); // Clear cart data
    //         } else {
    //             alert("Order Failed");
    //         }
    //     } catch (error) {
    //         console.error("Order Error:", error);
    //         alert("Something went wrong!");
    //     }
    // };
    const orderNow = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        
        if (!cart || cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
    
        let user_id = user._id;
        let city = user.city;
        let foodItem_id = cart.map(item => item._id.toString());
        let resto_id = cart[0]?.resto_id;
    
        try {
            // Fetch delivery partners for the user’s city
            let deliveryBoyResponse = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
            let deliveryBoyData = await deliveryBoyResponse.json();
    
            if (deliveryBoyData.result.length === 0) {
                alert("No delivery partner available in your city.");
                return;
            }
    
            // Select a random delivery partner from the list
            let deliveryBoyIds = deliveryBoyData.result.map(item => item._id);
            let deliveryBoyId = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
    
            const collection = {
                user_id,
                resto_id,
                foodItem_id,
                deliveryBoy_id: deliveryBoyId,
                status: "confirmed",
                amount: total
            };
    
            // Send the order request to the server
            let response = await fetch("/api/order", {
                method: 'POST',
                body: JSON.stringify(collection),
                headers: { "Content-Type": "application/json" }
            });
        
            response = await response.json();
    
            if (response.success) {
                alert("Order Confirmed");
                router.push("/myprofile"); // Redirect after confirming the order
                localStorage.removeItem("cart"); // Clear cart data from localStorage
            } else {
                alert("Order Failed: " + response.message || "Please try again.");
            }
        } catch (error) {
            console.error("Order Error:", error);
            alert("Something went wrong while placing your order.");
        }
    };
    
    
    
    


    const calculateTotals = (cart) => {
        const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
        setSubtotal(subtotal);

        const tax = subtotal * taxRate;
        setSalesTax(tax);

        const total = subtotal + tax;
        setTotal(total);
    };

  

    return (
        <>
            <CustomerHeader removeCartData={removeCartData} />

            <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-8">User Details</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-md text-center">
                    <div className="mb-4">
                        <span className="text-lg font-semibold">Name:</span>
                        <span className="text-lg ml-2">{userStorage.name}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-lg font-semibold">Address:</span>
                        <span className="text-lg ml-2">{userStorage.address}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-lg font-semibold">Mobile Number:</span>
                        <span className="text-lg ml-2">{userStorage.mobileNumber}</span>
                    </div>
                </div>

                {/* Cart and Summary Section */}
                {cartStorage.length > 0 && (
                    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                        <h1 className="text-2xl font-bold mb-6">Amount Details</h1>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Subtotal:</span>
                            <span className="text-lg">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Sales Tax (10%):</span>
                            <span className="text-lg">₹{salesTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Coupon Code:</span>
                            <button className="text-blue-500 hover:underline">Add Coupon</button>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold">Grand Total:</span>
                            <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-center items-center mb-4">
                            <h1 className="text-xl font-semibold">Payment Method:</h1>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg">Cash on Delivery:</span>
                            <span className="text-lg">₹{total.toFixed(2)}</span>
                        </div>
                        <button onClick={orderNow} className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-300">
                            Place your order now
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderPage;



// "use client";
// import React, { useState, useEffect } from 'react';
// import CustomerHeader from '../_components/CustomerHeader';
// import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

// const OrderPage = () => {
//     const [cartStorage, setCartStorage] = useState([]);
//     const [subtotal, setSubtotal] = useState(0);
//     const [salesTax, setSalesTax] = useState(0);
//     const [userStorage, setUserStorage] = useState(null);
//     const [total, setTotal] = useState(0);
//     const [removeCartData, setRemovedartData] = useState(false);
//     const taxRate = 0.10;
//     const router = useRouter();

//     useEffect(() => {
//         // Check if we are on the client side (browser)
//         if (typeof window !== 'undefined') {
//             const cartData = localStorage.getItem("cart");
//             if (cartData) {
//                 const parsedCart = JSON.parse(cartData);
//                 setCartStorage(parsedCart);
//                 calculateTotals(parsedCart);
//             }

//             const userData = localStorage.getItem("user");
//             if (userData) {
//                 setUserStorage(JSON.parse(userData));
//             }
//         }
//     }, []);

//     const orderNow = async () => {
//         if (!cartStorage || cartStorage.length === 0) {
//             alert("Your cart is empty.");
//             return;
//         }

//         const user = JSON.parse(localStorage.getItem("user"));
//         const cart = JSON.parse(localStorage.getItem("cart"));

//         let user_id = user._id;
//         let city = user.city;
//         let foodItem_id = cart.map(item => item._id.toString());
//         let resto_id = cart[0]?.resto_id;

//         try {
//             let deliveryBoyResponse = await fetch(`/api/deliverypartners/${city}`);
//             let deliveryBoyData = await deliveryBoyResponse.json();

//             if (deliveryBoyData.result.length === 0) {
//                 alert("No delivery partner available in your city.");
//                 return;
//             }

//             let deliveryBoyIds = deliveryBoyData.result.map(item => item._id);
//             let deliveryBoyId = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

//             const collection = {
//                 user_id,
//                 resto_id,
//                 foodItem_id,
//                 deliveryBoy_id: deliveryBoyId,
//                 status: "confirmed",
//                 amount: total
//             };

//             let response = await fetch("/api/order", {
//                 method: 'POST',
//                 body: JSON.stringify(collection),
//                 headers: { "Content-Type": "application/json" }
//             });

//             response = await response.json();

//             if (response.success) {
//                 alert("Order Confirmed");
//                 router.push("/myprofile");
//                 localStorage.removeItem("cart");
//             } else {
//                 alert("Order Failed: " + response.message || "Please try again.");
//             }
//         } catch (error) {
//             console.error("Order Error:", error);
//             alert("Something went wrong while placing your order.");
//         }
//     };

//     const calculateTotals = (cart) => {
//         const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
//         setSubtotal(subtotal);

//         const tax = subtotal * taxRate;
//         setSalesTax(tax);

//         const total = subtotal + tax;
//         setTotal(total);
//     };

//     return (
//         <>
//             <CustomerHeader removeCartData={removeCartData} />
//             <div className="container mx-auto px-4 py-8 flex flex-col items-center">
//                 <h1 className="text-3xl font-bold mb-8">User Details</h1>

//                 <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-md text-center">
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold">Name:</span>
//                         <span className="text-lg ml-2">{userStorage?.name || "Loading..."}</span>
//                     </div>
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold">Address:</span>
//                         <span className="text-lg ml-2">{userStorage?.address || "Loading..."}</span>
//                     </div>
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold">Mobile Number:</span>
//                         <span className="text-lg ml-2">{userStorage?.mobileNumber || "Loading..."}</span>
//                     </div>
//                 </div>

//                 {cartStorage.length > 0 && (
//                     <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
//                         <h1 className="text-2xl font-bold mb-6">Amount Details</h1>
//                         <div className="flex justify-between items-center mb-4">
//                             <span className="text-lg font-semibold">Subtotal:</span>
//                             <span className="text-lg">₹{subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between items-center mb-4">
//                             <span className="text-lg font-semibold">Sales Tax (10%):</span>
//                             <span className="text-lg">₹{salesTax.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between items-center mb-4">
//                             <span className="text-lg font-semibold">Coupon Code:</span>
//                             <button className="text-blue-500 hover:underline">Add Coupon</button>
//                         </div>
//                         <div className="flex justify-between items-center mb-4">
//                             <span className="text-xl font-bold">Grand Total:</span>
//                             <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-center items-center mb-4">
//                             <h1 className="text-xl font-semibold">Payment Method:</h1>
//                         </div>
//                         <div className="flex justify-between items-center mb-4">
//                             <span className="text-lg">Cash on Delivery:</span>
//                             <span className="text-lg">₹{total.toFixed(2)}</span>
//                         </div>
//                         <button onClick={orderNow} className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-300">
//                             Place your order now
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default OrderPage;
