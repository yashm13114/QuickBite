import { useState } from "react";

const AddFoodItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false)
    const handleAddFoodItem = async (e) => {
        e.preventDefault();
        if (!name || !price || !path || !description) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let resto_id;
        const restaurantData = localStorage.getItem("restaurantUser");

        if (restaurantData) {
            try {
                const parsedData = JSON.parse(restaurantData);
                resto_id = parsedData._id;
            } catch (error) {
                console.error("Error parsing JSON from localStorage", error);
                alert("There was an error retrieving your restaurant data.");
                return;
            }
        } else {
            alert("No restaurant data found.");
            return;
        }

        const foodData = { name, price, img_path: path, description, resto_id };
        console.log('Sending data to server:', foodData); // Log data to be sent

        try {
            const response = await fetch('/api/restaurant/foods/', {
                method: 'POST',
                body: JSON.stringify(foodData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData.success) {
                alert("Food item added");
            } else {
                alert("Failed to add food item.");
            }
        } catch (error) {
            console.error("Error adding food item:", error);
            alert("There was an error adding the food item.");
        }
    };

    return (
        <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>

            <form onSubmit={handleAddFoodItem}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                        Enter Name
                    </label>
                    <input
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        name="name"
                    />
                    {
                        error && !name && <>
                            <div>
                                <span className="text-red-500">email is required</span>
                            </div>
                        </>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="price">
                        Enter Price
                    </label>
                    <input
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        id="price"
                        name="price"
                    />
                    {
                        error && !price && <>
                            <div>
                                <span className="text-red-500">price is required</span>
                            </div>
                        </>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="path">
                        Enter image path
                    </label>
                    <input
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        type="text"
                        id="path"
                        name="path"
                    />
                    {
                        error && !path && <>
                            <div>
                                <span className="text-red-500">image path is required</span>
                            </div>
                        </>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="description">
                        Enter description
                    </label>
                    <input
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        id="description"
                        name="description"
                    />
                    {
                        error && !description && <>
                            <div>
                                <span className="text-red-500">description is required</span>
                            </div>
                        </>
                    }
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                        type="submit"
                    >
                        Add Food Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFoodItem;
