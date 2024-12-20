'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const deliveryData = JSON.parse(localStorage.getItem("delivery"));

    if (!deliveryData) {
      // Redirect to deliveryDashboard if no delivery data found
      router.push("/deliveryDashboard");
    } else {
      setUserDetails(deliveryData);
      getMyOrders(deliveryData._id); // Fetch orders for the delivery partner
    }
  }, []);

  const getMyOrders = async (deliveryId) => {
    if (!deliveryId) {
      console.error("Delivery ID is missing");
      return; // Early return if deliveryId is not valid
    }

    try {
      let response = await fetch(`/api/deliverypartners/orders/${deliveryId}/`);
      let data = await response.json();
      console.log(data); // Inspect the response for debugging

      if (data.success) {
        setMyOrders(data.result);
      } else {
        console.error("Failed to fetch orders:", data.message); // Improved error logging
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
              <p><strong>Mobile:</strong> {userDetails.mobile}</p>
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
                        src={item.foodItems[0]?.img_path} // Assuming you're displaying the first food item's image
                        alt={item.foodItems[0]?.name}
                        className="w-20 h-20 rounded-md object-cover mr-4"
                      />
                      {/* Order Info */}
                      <div>
                        <h2 className="text-xl font-semibold">{item.foodItems[0]?.name}</h2>
                        <p>Price: Rs. {item.amount}</p> {/* Ensure you're accessing quantity correctly */}
                      </div>
                    </div>
                    {/* Order Status */}
                    <div className="mt-4 md:mt-0 text-right">
                      Status: <p className="text-green-500 font-semibold">
                        {item.status === "confirmed" ? "Confirmed" : item.status}
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

// File: components/DeliveryDashboard.js (or similar)
// 'use client';

// import { useEffect, useState } from "react";

// const DeliveryDashboard = () => {
//   const [myOrders, setMyOrders] = useState([]);
//   const [error, setError] = useState("");
//   const [deliveryId, setDeliveryId] = useState(null); // Use state to store deliveryId

//   const getMyOrders = async (deliveryId) => {
//     if (!deliveryId) {
//       console.error("Delivery ID is not defined.");
//       return; // Early return if the deliveryId is not valid
//     }

//     try {
//       let response = await fetch(`http://localhost:3000/api/deliverypartners/orders/${deliveryId}`);
//       // Check if the response is ok
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       let data = await response.json();
//       console.log("API Response:", data); // Log the fetched data

//       if (data.success) {
//         setMyOrders(data.result); // Set orders if available
//       } else {
//         setError(data.message || "Failed to fetch orders");
//         console.log("No orders assigned:", data.message); // Log when no orders are found
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Error fetching orders");
//     }
//   };

//   useEffect(() => {
//     // Read delivery ID from localStorage when the component mounts
//     const storedDelivery = localStorage.getItem('delivery');
//     if (storedDelivery) {
//       const parsedDelivery = JSON.parse(storedDelivery);
//       setDeliveryId(parsedDelivery._id); // Set delivery ID from localStorage
//     }
//   }, []);

//   useEffect(() => {
//     if (deliveryId) {
//       getMyOrders(deliveryId); // Call the function when deliveryId is set
//     }
//   }, [deliveryId]);

//   return (
//     <div>
//       <h1>Delivery Dashboard</h1>
//       {error && <p>{error}</p>} {/* Display error message if any */}
//       {myOrders.length > 0 ? (
//         <ul>
//           {myOrders.map(order => (
//             <li key={order._id}>{order.details}</li> // Adjust based on your order structure
//           ))}
//         </ul>
//       ) : (
//         !error && <p>No orders assigned to you.</p> // Show message only if no error
//       )}
//     </div>
//   );
// };

// export default DeliveryDashboard;

