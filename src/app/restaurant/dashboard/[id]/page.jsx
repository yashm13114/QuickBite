"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, [props.params.id]); // Ensure the dependency array is correct    

    const handleLoadFoodItem = async () => {
        try {
            const res = await fetch(`/api/restaurant/foods/edit/${props.params.id}/`);
            const data = await res.json();
            console.log(data); // Check the structure of the data returned
            if (data.success) {
                setName(data.result.name);
                setPrice(data.result.price);
                setPath(data.result.img_path);
                setDescription(data.result.description);
                setIsLoading(false); // Update loading state
            } else {
                alert("Failed to load food item data.");
                setIsLoading(false); // Update loading state
            }
        } catch (error) {
            console.error("Error loading food item:", error);
            alert("There was an error loading the food item.");
            setIsLoading(false); // Update loading state
        }
    };

    const handleEditFoodItem = async (e) => {
        e.preventDefault();
        if (!name || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
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
        console.log('Sending data to server:', foodData);

        try {
            const response = await fetch(`http://localhost:3000/api/restaurant/foods/${props.params.id}`, {
                method: 'PUT',
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
                alert("Food item updated successfully");
                router.push(`/restaurant/dashboard`);
            } else {
                alert("Failed to update food item.");
            }
        } catch (error) {
            console.error("Error updating food item:", error);
            alert("There was an error updating the food item.");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-6">Update Your Food Items</h2>

            <form onSubmit={handleEditFoodItem}>
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
                    {error && !name && (
                        <div>
                            <span className="text-red-500">Name is required</span>
                        </div>
                    )}
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
                    {error && !price && (
                        <div>
                            <span className="text-red-500">Price is required</span>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="path">
                        Enter Image Path
                    </label>
                    <input
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        type="text"
                        id="path"
                        name="path"
                    />
                    {error && !path && (
                        <div>
                            <span className="text-red-500">Image path is required</span>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="description">
                        Enter Description
                    </label>
                    <input
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        id="description"
                        name="description"
                    />
                    {error && !description && (
                        <div>
                            <span className="text-red-500">Description is required</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                        type="submit"
                    >
                        Update Food Item
                    </button>
                    <button
                        className="bg-blue-500 ml-2 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => router.push(`/restaurant/dashboard`)}
                    >
                        Back to Food Item List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditFoodItems;
