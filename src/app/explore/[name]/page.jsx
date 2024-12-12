"use client"
import CustomerHeader from '@/app/_components/CustomerHeader'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity } from 'react-icons/fa';

const Page = (props) => {
    const name = decodeURI(props.params.name);
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState(null);

    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

    const [cartIds, setCartIds] = useState(() =>
        cartStorage.map((item) => item._id)
    );

    const [removeCartData, setRemoveCartData] = useState();

    useEffect(() => {
        loadRestaurantDetails();
    }, []);

    console.log(cartIds);

    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;
        let res = await fetch("http://localhost:3000/api/customer/" + id);
        res = await res.json();
        if (res.success) {
            setRestaurantDetails(res.details);
            setFoodItems(res.foodItems);
        }
    };

    const addToCart = (item) => {
        setCartData(item);
        let localCartIds = [...cartIds, item._id];
        setCartIds(localCartIds);
        setRemoveCartData(null);
    };

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        setCartData(null);
        let localIds = cartIds.filter(item => item !== id);
        setCartIds(localIds);
    };

    return (
        <>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <section
                className="bg-cover bg-center bg-no-repeat bg-[url('https://static.vecteezy.com/system/resources/previews/002/001/840/non_2x/food-delivery-service-design-vector.jpg')] 
  bg-gray-700 bg-blend-multiply min-h-screen flex items-center">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        {name}
                    </h1>
                </div>
            </section>

            <div className="p-4 max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Restaurant Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                        <FaPhone className="text-blue-500 text-xl" />
                        <h3 className="text-lg font-medium text-gray-700">{restaurantDetails?.contact}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaEnvelope className="text-blue-500 text-xl" />
                        <h3 className="text-lg font-medium text-gray-700">{restaurantDetails?.email}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaCity className="text-blue-500 text-xl" />
                        <h3 className="text-lg font-medium text-gray-700">{restaurantDetails?.city}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaMapMarkerAlt className="text-blue-500 text-xl" />
                        <h3 className="text-lg font-medium text-gray-700">{restaurantDetails?.address}</h3>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-8">
                {foodItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={item.img_path} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h4 className="text-2xl font-bold mb-2">{item.name}</h4>
                            <p className="text-lg font-semibold text-gray-700">Price: ₹{item.price}</p>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            {
                                cartIds.includes(item._id) ?
                                    <button onClick={() => removeFromCart(item._id)} className="flex items-center justify-center w-full text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded">
                                        <FaShoppingCart className="mr-2" />Remove from cart
                                    </button> :
                                    <button onClick={() => addToCart(item)} className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded">
                                        <FaShoppingCart className="mr-2" /> Add to Cart
                                    </button>
                            }
                        </div>
                    </div>
                ))}
            </div>
            {/* <div>
                {foodItems.map((item) => (
                    <>
                        <div className="flex justify-center space-x-4">
                            <div className="max-w-xs rounded-lg border border-zinc-200 bg-white shadow-md p-4">

                                <img className="w-full h-48 object-cover rounded-lg mt-2" src={`http://localhost:3000${item.img_path}`} alt={item.name} />

                                <h2 className="mt-2 text-lg font-semibold">{item.name}</h2>
                                <p className="text-zinc-600">{item.description}</p>
                                <p className="mt-2 text-xl font-bold">${item.price}</p>
                                {
                                    cartIds.includes(item._id) ?
                                        <button onClick={() => removeFromCart(item._id)} className="flex items-center justify-center w-full text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded">
                                            <FaShoppingCart className="mr-2" />Remove from cart
                                        </button> :
                                        <button onClick={() => addToCart(item)} className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded">
                                            <FaShoppingCart className="mr-2" /> Add to Cart
                                        </button>
                                }
                            </div>

                        </div>
                    </>

                ))}

            </div> */}

        </>
    );
}

export default Page;
