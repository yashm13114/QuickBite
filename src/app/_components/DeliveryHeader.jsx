'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const DeliveryHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(undefined);

    const router = useRouter();

    useEffect(() => {
        // Ensure localStorage access happens only on the client side
        if (typeof window !== "undefined") {
            const userStorage = JSON.parse(localStorage.getItem("delivery"));
            setUser(userStorage);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("delivery");
            router.push("/delivery-auth");
        }
    };

    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                {/* Brand */}
                <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
                    QuickBite
                </div>

                {/* Hamburger menu for small screens */}
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

                {/* Navigation links */}
                <div
                    className={`lg:flex ${isOpen ? "block" : "hidden"} lg:space-x-4 lg:mt-0 mt-4 flex flex-col lg:flex-row items-center text-xl`}
                >
                    <Link href="/" className="relative text-white px-4 py-2 group hover:text-orange-600">
                        Home
                        <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </Link>

                    {user ? (
                        <>
                            <span className="relative text-white px-4 py-2 group hover:text-orange-600">
                                {user?.name}
                                <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </span>
                            <button
                                onClick={logout}
                                className="relative text-white px-4 py-2 group hover:text-orange-600"
                            >
                                Logout
                                <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/delivery-auth"
                                className="relative text-white px-4 py-2 group hover:text-orange-600"
                            >
                                Login
                                <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};


