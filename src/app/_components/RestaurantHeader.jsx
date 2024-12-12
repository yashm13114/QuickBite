import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setdetails] = useState();
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        let data = localStorage.getItem("restaurantUser")
        if (!data) {
            router.push("/restaurant")
        } else if (data && pathname == "/restaurant") {
            router.push("/restaurant/dashboard")
        } else {
            setdetails(JSON.parse(data))
        }
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const logout = () => {
        localStorage.removeItem("restaurantUser")
        router.push("/restaurant")
    };
    return (
        <>
            <nav className="bg-black p-4">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
                        Portfolio
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
                        className={`lg:flex flex-col lg:flex-row ${isOpen ? 'block' : 'hidden'} lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}
                    >
                        <a href="/" className="text-white px-4 py-2 hover:text-orange-600">
                            Home
                        </a>
                        {
                            details && details.name ?
                                <>
                                    <a href="#Projects" className="text-white px-4 py-2 hover:text-orange-600">
                                        Profile
                                    </a>
                                    <button onClick={logout} className="text-white px-4 py-2 hover:text-orange-600">
                                        Logout
                                    </button>
                                </>
                                : <a href="/" className="text-white px-4 py-2 hover:text-orange-600">
                                    Login/Signup
                                </a>


                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default RestaurantHeader