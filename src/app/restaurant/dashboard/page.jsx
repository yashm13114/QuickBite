'use client'
import AddFoodItem from '@/app/_components/AddFoodItem';
import FoodItemList from '@/app/_components/FoodItemList';
import RestaurantHeader from '@/app/_components/RestaurantHeader'
import React, { useState } from 'react'

const dashboardPage = () => {
  const [addItem, setItem] = useState(false);
  return (
    <>
      <RestaurantHeader />
      <div className='flex justify-center gap-3 mt-10'>
        <button
          onClick={() => setItem(true)}
          class="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
        >
          <span
            class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
          >
            <span
              class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
            ></span>
          </span>
          <span
            class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
          >
            <span
              class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
            ></span>
          </span>
          <span
            class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
          ></span>
          <span
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
          >Add Food</span>
        </button>

        <button
          onClick={() => setItem(false)}
          className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
          Dashboard
        </button>
      </div>

      {/* <button type="submit" onClick={() => setItem(true)}>Add Food</button> */}
      {/* <button type="submit" onClick={() => setItem(false)}>Dashboard</button> */}
      {
        addItem ? <AddFoodItem /> : <FoodItemList />
      }
    </>
  )
}

export default dashboardPage