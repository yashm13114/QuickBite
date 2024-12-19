// 'use client';
// import { useRouter } from "next/navigation";
// import CustomerHeader from "./_components/CustomerHeader";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [locations, setLocations] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const router = useRouter()
//   useEffect(() => {
//     loadLocations();
//     loadRestaurants();
//   }, []);

//   const loadLocations = async () => {
//     let response = await fetch('http://localhost:3000/api/customer/locations');
//     response = await response.json();
//     if (response.success) {
//       setLocations(response.result);
//     }
//   };

//   const loadRestaurants = async (params) => {
//     let url = 'http://localhost:3000/api/customer';
//     if (params?.location) {
//       url += `?location=${params.location}`;
//     }
//     if (params?.restaurant) {
//       url += `?restaurant=${params.restaurant}`;
//     }
//     let response = await fetch(url);
//     response = await response.json();
//     if (response.success) {
//       setRestaurants(response.result);
//     }
//   };

//   const handleLocationChange = (event) => {
//     const selectedLocation = event.target.value;
//     if (selectedLocation === "") {
//       // Load all restaurants if "Select area" is chosen
//       loadRestaurants();
//     } else {
//       // Load restaurants for the selected location
//       loadRestaurants({ location: selectedLocation });
//     }
//   };

//   return (
//     <div>
//       <CustomerHeader />
      
//       <div>
//         <section className="bg-cover bg-center bg-no-repeat bg-[url('https://www.bitesbee.com/wp-content/uploads/2021/09/banner-3.jpg')] bg-gray-700 bg-blend-multiply">
//           <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
//             <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
//             QuickBite
//             </h1>

//             <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
//               <select
//                 onChange={handleLocationChange}
//                 className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
//               >
//                 <option value="">Select area</option>
//                 {locations.map((location) => (
//                   <option key={location} value={location}>
//                     {location}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 onChange={(e) => {
//                   loadRestaurants({ restaurant: e.target.value })
//                 }}
//                 placeholder="Enter food and restaurant name"
//                 className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
//               />
//             </div>
//           </div>
//         </section>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {restaurants.map((item) => (
//           <div
//           onClick={()=> router.push("explore/"+item.name+"?id="+item._id)}
//             key={item.id}
//             className="bg-orange-400 text-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:bg-orange-600"
//           >
//             <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
//             <p className="text-gray-200 mb-1">Contact: {item.contact}</p>
//             <p className="text-gray-200 mb-1">City: {item.city}</p>
//             <p className="text-gray-200 mb-1">Email: {item.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// og
'use client';
import { useRouter } from "next/navigation";
import CustomerHeader from "./_components/CustomerHeader";
import { useEffect, useState } from "react";
import useTypingEffect from './_components/hooks/useTypingEffect'; // Import the custom hook
import Footer from "./_components/Footer";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  
  const sentences = [
    "dDelivering happiness to your door.",
    "eExplore a variety of cuisines.",
    "oOrder your favorite meals easily."
  ];
  
  const router = useRouter();

  // Using the custom hook to handle typing effect
  const displayedText = useTypingEffect(sentences[currentSentenceIndex]);

  useEffect(() => {
    loadRestaurants();

    const interval = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 5000); // Change sentence every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const loadRestaurants = async (params) => {
    // let url = 'http://localhost:3000/api/customer';
    let url =`https://quick-bite-8fh2.vercel.app/api/customer`;
    if (params?.location) {
      url += `?location=${params.location}`;
    }
    if (params?.restaurant) {
      url += `?restaurant=${params.restaurant}`;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);

      // Extract unique cities from restaurants data
      const uniqueCities = [...new Set(response.result.map(restaurant => restaurant.city))];
      setLocations(uniqueCities);
    }
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    if (selectedLocation === "") {
      loadRestaurants();
    } else {
      loadRestaurants({ location: selectedLocation });
    }
  };


  return (
    <div>
      <CustomerHeader />
      
      <div>
        <section className="bg-cover bg-center bg-no-repeat bg-[url('https://www.bitesbee.com/wp-content/uploads/2021/09/banner-3.jpg')] bg-gray-700 bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            {displayedText}
            </h1>

            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <select
                onChange={handleLocationChange}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                <option value="">Select area</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <input
                type="text"
                onChange={(e) => {
                  loadRestaurants({ restaurant: e.target.value });
                }}
                placeholder="Enter food and restaurant name"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {restaurants.map((item) => (
          <div
            onClick={() => router.push("explore/" + item.name + "?id=" + item._id)}
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <img 
              src={item.image || "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/11/4ee8bc77-ca9f-41bd-a0f3-511c70902b91_91768.JPG"} 
              alt={item.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-1">Contact: {item.contact}</p>
              <p className="text-gray-600 mb-1">City: {item.city}</p>
              <p className="text-gray-600 mb-1">Email: {item.email}</p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
                  View Menu
                </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
