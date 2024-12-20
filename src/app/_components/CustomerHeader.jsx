



// 'use client';
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const CustomerHeader = ({ cartData, removeCartData }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [user, setUser] = useState(undefined);
//     const [cartNumber, setCartNumber] = useState(0);
//     const [cartItem, setCartItem] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const userStorage = JSON.parse(localStorage.getItem("user"));
//             setUser(userStorage);
//         }
//     }, []);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
//             setCartItem(cartStorage);
//             setCartNumber(cartStorage.length);
//         }
//     }, []);

//     useEffect(() => {
//         if (cartData && cartItem) {
//             let updatedCart;

//             const existingItem = cartItem.find(item => item._id === cartData._id);

//             if (existingItem) {
//                 updatedCart = cartItem.map(item =>
//                     item._id === cartData._id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 updatedCart = [...cartItem, cartData];
//             }

//             setCartItem(updatedCart);
//             setCartNumber(updatedCart.length);

//             if (typeof window !== "undefined") {
//                 localStorage.setItem("cart", JSON.stringify(updatedCart));
//             }
//         }
//     }, [cartData, cartItem]);

//     useEffect(() => {
//         if (removeCartData) {
//             setCartItem([]);
//             setCartNumber(0);
//             if (typeof window !== "undefined") {
//                 localStorage.removeItem("cart");
//             }
//         }
//     }, [removeCartData]);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const logout = () => {
//         if (typeof window !== "undefined") {
//             localStorage.removeItem("restaurantUser");
//             router.push("/restaurant");
//         }
//     };

//     const logotUser = () => {
//         if (typeof window !== "undefined") {
//             localStorage.removeItem("user");
//             router.push("/user-auth");
//         }
//     };

//     return (
//         <>
//             <nav className="bg-black p-4">
//                 <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
//                     <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
//                         QuickBite
//                     </div>

//                     <div className="lg:hidden">
//                         <button onClick={toggleMenu} className="text-white focus:outline-none">
//                             <svg
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16m-7 6h7"
//                                 ></path>
//                             </svg>
//                         </button>
//                     </div>

//                     <div
//                         className={`lg:flex flex-col lg:flex-row ${isOpen ? 'block' : 'hidden'} lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}
//                     >
//                         <Link href="/" className="relative text-white px-4 py-2 group hover:text-green-500">
//                             Home
//                             <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                         </Link>
//                         {user ? (
//                             <>
//                                 <li>
//                                     <Link href="#" className="relative text-white px-4 py-2 group hover:text-green-500">
//                                         {user?.name}
//                                         <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <button onClick={logotUser} className="relative text-white px-4 py-2 group hover:text-green-500">
//                                         Logout
//                                         <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                                     </button>
//                                 </li>
//                             </>
//                         ) : (
//                             <>
//                                 <Link href="/user-auth" className="relative text-white px-4 py-2 group hover:text-green-500">
//                                     Login
//                                     <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                                 </Link>
//                                 <Link href="/user-auth">
//                                     <button onClick={logout} className="relative text-white px-4 py-2 group hover:text-green-500">
//                                         Signup
//                                         <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                                     </button>
//                                 </Link>
//                             </>
//                         )}
//                         <Link href={cartNumber ? "/cart" : "#"} className="relative text-white px-4 py-2 group hover:text-green-500">
//                             Cart ({cartNumber})
//                             <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                         </Link>
//                         <Link href="/restaurant" className="relative text-white px-4 py-2 group hover:text-green-500">
//                             Add Restaurant
//                             <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                         </Link>
//                         <Link href="/deliveryPartner" className="relative text-white px-4 py-2 group hover:text-green-500">
//                             Delivery Partner
//                             <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                         </Link>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default CustomerHeader;


'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = ({ cartData, removeCartData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStorage = JSON.parse(localStorage.getItem("user"));
            setUser(userStorage);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItem(cartStorage);
            setCartNumber(cartStorage.length);
        }
    }, []);

    // useEffect(() => {
    //     if (cartData && cartItem) {
    //         let updatedCart;

    //         const existingItem = cartItem.find(item => item._id === cartData._id);

    //         if (existingItem) {
    //             updatedCart = cartItem.map(item =>
    //                 item._id === cartData._id
    //                     ? { ...item, quantity: item.quantity + 1 }
    //                     : item
    //             );
    //         } else {
    //             updatedCart = [...cartItem, cartData];
    //         }

    //         setCartItem(updatedCart);
    //         setCartNumber(updatedCart.length);

    //         if (typeof window !== "undefined") {
    //             localStorage.setItem("cart", JSON.stringify(updatedCart));
    //         }
    //     }
    // }, [cartData, cartItem]);
    useEffect(() => {
        if (cartData) {
            let updatedCart = [...cartItem];
            const existingItem = cartItem.find(item => item._id === cartData._id);
   
            if (existingItem) {
                updatedCart = updatedCart.map(item =>
                    item._id === cartData._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart.push(cartData);
            }
   
            setCartItem(updatedCart);
            setCartNumber(updatedCart.length);
            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }
        }
    }, [cartData]);
   
    useEffect(() => {
        if (removeCartData) {
            setCartItem([]);
            setCartNumber(0);
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
            }
        }
    }, [removeCartData]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("restaurantUser");
            router.push("/restaurant");
        }
    };

    const logotUser = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            router.push("/user-auth");
        }
    };

    return (
        <>
            <nav className="bg-black p-4">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    {/* Logo & Hamburger on same row for mobile */}
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-green-500 hover:cursor-pointer">
                            QuickBite
                        </div>
                        {/* Hamburger Menu Button */}
                        <div className="lg:hidden">
                            <button onClick={toggleMenu} className="text-white focus:outline-none">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Dropdown menu that appears below the navbar */}
                    <div
                        className={`lg:flex flex-col lg:flex-row ${isOpen ? 'block' : 'hidden'} lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}
                    >
                        <Link href="/" className="relative text-white px-4 py-2 group hover:text-green-500">
                            Home
                            <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                        </Link>
                        {user ? (
                            <>
                                <li>
                                    <Link href="#" className="relative text-white px-4 py-2 group hover:text-green-500">
                                        {user?.name}
                                        <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={logotUser} className="relative text-white lg:px-1 px-0 lg:pr-0 pr-3 py-2 group hover:text-green-500">
                                        Logout
                                        <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <Link href="/user-auth" className="relative text-white px-4 py-2 group hover:text-green-500">
                                    Login
                                    <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </Link>
                                <Link href="/user-auth">
                                    <button onClick={logout} className="relative text-white px-4 py-2 group hover:text-green-500">
                                        Signup
                                        <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                    </button>
                                </Link>
                            </>
                        )}
                        <Link href={cartNumber ? "/cart" : "#"} className="relative text-white px-4 py-2 group hover:text-green-500">
                            Cart ({cartNumber})
                            <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                        </Link>
                        <Link href="/restaurant" className="relative text-white px-4 py-2 group hover:text-green-500">
                            Add Restaurant
                            <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                        </Link>
                        <Link href="/deliveryPartner" className="relative text-white px-4 py-2 group hover:text-green-500">
                            Delivery Partner
                            <span className="rounded-lg absolute left-0 -bottom-1 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default CustomerHeader;
