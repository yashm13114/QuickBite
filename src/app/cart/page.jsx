
// "use client";
// import React, { useState, useEffect } from 'react';
// import CustomerHeader from '../_components/CustomerHeader';
// import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

// const CartPage = () => {
//   const [cartStorage, setCartStorage] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [salesTax, setSalesTax] = useState(0);
//   const [total, setTotal] = useState(0);
//   const taxRate = 0.10; // 10% sales tax rate
//   const router = useRouter();

//   useEffect(() => {
//     const cartData = localStorage.getItem("cart");
//     if (cartData) {
//       const parsedCart = JSON.parse(cartData);
//       setCartStorage(parsedCart);
//       calculateTotals(parsedCart);
//     }
//   }, []);

//   const orderNow = () => {
//     if (JSON.parse(localStorage.getItem("user"))) {
//       router.push("/order");
//     } else {
//       router.push("/user-auth?order=true");
//     }
//   };

//   const calculateTotals = (cart) => {
//     const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
//     setSubtotal(subtotal);

//     const tax = subtotal * 0.1; // Assuming a 10% tax rate
//     setSalesTax(tax);

//     const total = subtotal + tax;
//     setTotal(total);
//   };

//   const removeFromCart = (id) => {
//     const updatedCart = cartStorage.filter(item => item._id !== id);
//     setCartStorage(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
//     calculateTotals(updatedCart);
//   };

//   const updateQuantity = (id, delta) => {
//     const updatedCart = cartStorage.map(item => {
//       if (item._id === id) {
//         const newQuantity = Math.max(1, (item.quantity || 1) + delta); // Prevents quantity going below 1
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });

//     // Update cart storage and calculate totals without using setCartNumber
//     setCartStorage(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     calculateTotals(updatedCart);
//   };

//   return (
//     <>
//       <CustomerHeader />

//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-center">Your Cart ({cartStorage.length} items)</h1>

//         {/* Cart Items in Table Format */}
//         {cartStorage.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border rounded-lg">
//               <thead>
//                 <tr className="w-full bg-gray-200">
//                   <th className="p-4 text-left">Product</th>
//                   <th className="p-4 text-center">Quantity</th>
//                   <th className="p-4 text-center">Price</th>
//                   <th className="p-4 text-center">Total</th>
//                   <th className="p-4 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartStorage.map(item => (
//                   <tr key={item._id} className="border-b">
//                     <td className="p-4 flex items-center">
//                       <img src={item.img_path} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
//                       <div>
//                         <p className="font-semibold">{item.name}</p>
//                         <p className="text-gray-500">Price: ₹{Number(item.price).toFixed(2)}</p>
//                       </div>
//                     </td>
//                     <td className="p-4 text-center">
//                       <div className="flex items-center justify-center space-x-2">
//                         <button onClick={() => updateQuantity(item._id, -1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
//                           <FaMinus />
//                         </button>
//                         <span className="text-lg">{item.quantity || 1}</span>
//                         <button onClick={() => updateQuantity(item._id, 1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
//                           <FaPlus />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="p-4 text-center">₹{Number(item.price).toFixed(2)}</td>
//                     <td className="p-4 text-center">₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
//                     <td className="p-4 text-center">
//                       <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-600">
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center">Your cart is empty.</p>
//         )}

//         {/* Summary Section */}
//         {cartStorage.length > 0 && (
//           <div className="mt-8 p-6 bg-gray-100 rounded-lg max-w-lg mx-auto">
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-lg font-semibold">Subtotal:</span>
//               <span className="text-lg">₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-lg font-semibold">Sales Tax (10%):</span>
//               <span className="text-lg">₹{salesTax.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-lg font-semibold">Coupon Code:</span>
//               <button className="text-blue-500 hover:underline">Add Coupon</button>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-xl font-bold">Grand Total:</span>
//               <span className="text-xl font-bold">₹{(subtotal + salesTax).toFixed(2)}</span>
//             </div>

//             <button onClick={orderNow} className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 mt-4">
//               Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartPage;




"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [salesTax, setSalesTax] = useState(0);
  const [total, setTotal] = useState(0);
  const taxRate = 0.10; // 10% sales tax rate
  const router = useRouter();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);

      // Ensure default quantity is set to 1 for all items
      const cartWithDefaultQuantity = parsedCart.map(item => ({
        ...item,
        quantity: item.quantity || 1, // Set default quantity to 1 if undefined
      }));

      setCartStorage(cartWithDefaultQuantity);
      localStorage.setItem("cart", JSON.stringify(cartWithDefaultQuantity)); // Update localStorage
      calculateTotals(cartWithDefaultQuantity);
    }
  }, []);

  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  const calculateTotals = (cart) => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setSubtotal(subtotal);

    const tax = subtotal * taxRate;
    setSalesTax(tax);

    const total = subtotal + tax;
    setTotal(total);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    calculateTotals(updatedCart);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartStorage.map((item) => {
      if (item._id === id) {
        const newQuantity = Math.max(1, (item.quantity || 1) + delta); // Prevents quantity going below 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  return (
    <>
      <CustomerHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Your Cart ({cartStorage.length} items)
        </h1>

        {cartStorage.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartStorage.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-4 flex items-center">
                      <img
                        src={item.img_path}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">
                          Price: ₹{Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-lg">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      ₹{Number(item.price).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}

        {cartStorage.length > 0 && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg max-w-lg mx-auto">
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

            <button
              onClick={orderNow}
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 mt-4"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
