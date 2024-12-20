import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FoodItemList = () => {
    const [fooItems, setFoodItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const router = useRouter()

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        const resto_id = restaurantData._id;
        const response = await fetch(`/api/restaurant/foods/${resto_id}/`);
        const data = await response.json();
        if (data.success) {
            setFoodItems(data.result);
        } else {
            alert("Food items list is not loading");
        }
    };

    const handleDelete = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    const handleEdit = (id) => {
        setSelectedItem(id);
        setShowEditModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`/api/restaurant/foods/${selectedItem}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await response.json();
            if (data.success) {
                // Filter out the deleted item from the state
                setFoodItems(fooItems.filter(item => item._id !== selectedItem));
                setShowDeleteModal(false);
                console.log(`Item with id: ${selectedItem} has been deleted`);
            } else {
                alert("Failed to delete the food item");
            }
        } catch (error) {
            console.error("Error deleting the item:", error);
            alert("An error occurred while deleting the item.");
        }
    };
    

    const confirmEdit = async(updatedData) => {
        try {
            const response = await fetch(`/api/restaurant/foods/${selectedItem}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send the updated data in the request body
            });
    
            const data = await response.json();
            if (data.success) {
                // Update the item in the state with the new data
                setFoodItems(fooItems.map(item => 
                    item._id === selectedItem ? { ...item, ...updatedData } : item
                ));
                setShowEditModal(false);
                console.log(`Item with id: ${selectedItem} has been updated`);
            } else {
                alert("Failed to update the food item");
            }
        } catch (error) {
            console.error("Error updating the item:", error);
            alert("An error occurred while updating the item.");
        }
    };
    

    return (
        <div className='flex flex-col items-center p-6'>
            <div className='text-4xl font-bold mb-6'>Food Items</div>
            <div className='overflow-x-auto w-full'>
                <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
                    <thead className='bg-gray-800 text-white'>
                        <tr>
                            <th className='py-3 px-5'>S.N</th>
                            <th className='py-3 px-5'>Name</th>
                            <th className='py-3 px-5'>Price</th>
                            <th className='py-3 px-5'>Description</th>
                            <th className='py-3 px-5'>Image</th>
                            <th className='py-3 px-5'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fooItems && fooItems.map((item, index) => (
                            <tr key={index} className='border-b hover:bg-gray-100 transition-colors'>
                                <td className='py-3 px-5 text-center'>{index + 1}</td>
                                <td className='py-3 px-5'>{item.name}</td>
                                <td className='py-3 px-5'>{item.price}</td>
                                <td className='py-3 px-5'>{item.description}</td>
                                <td className='py-3 px-5'>
                                    <img src={item.img_path} alt="food item" className='w-20 h-20 object-cover rounded-lg' />
                                </td>
                                <td className='py-3 px-5 text-center'>
                                    <button 
                                        className='bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 transition'
                                        onClick={() => handleDelete(item._id)}>
                                        Delete
                                    </button>
                                    <button 
                                        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
                                        onClick={() => router.push(`dashboard/${item._id}`)}>
                                        Edit
                                    </button>
                              
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-xl mb-4'>Are you sure you want to delete this item?</h2>
                        <div className='flex justify-end'>
                            <button 
                                className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2'
                                onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button 
                                className='bg-red-500 text-white px-4 py-2 rounded-lg'
                                onClick={confirmDelete}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-xl mb-4'>Edit Food Item</h2>
                        {/* Add form fields for editing here */}
                        <div className='flex justify-end'>
                            <button 
                                className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2'
                                onClick={() => setShowEditModal(false)}>
                                Cancel
                            </button>
                            <button 
                                className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                                onClick={confirmEdit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodItemList;
