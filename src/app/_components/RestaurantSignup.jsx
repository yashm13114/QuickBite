// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const RestaurantSignup = ({ setLogin }) => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [c_password, setc_password] = useState('');
//   const [name, setName] = useState('');
//   const [city, setCity] = useState('');
//   const [address, setAddress] = useState('');
//   const [contact, setContact] = useState('');
//   const [error, setError] = useState(false)
//   const [passworderror, setPasswordError] = useState(false)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // Ensure the code is only run on the client side
//       router.prefetch('/restaurant/dashboard');
//     }
//   }, [router]);

//   const handleSignUp = async () => {
//     if (password !== c_password) {
//       setPasswordError(true);
//       return;
//     } else {
//       setPasswordError(false);
//     }
//     if (!email || !password || !c_password || !name || !city || !address || !contact) {
//       setError(true)

//     } else {
//       setError(false)
//     }
//     setPasswordError(false);

//     let response = await fetch('http://localhost:3000/api/restaurant', {
//       method: 'POST',
//       body: JSON.stringify({ email, password, name, city, address, contact }),
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       }
//     });

//     response = await response.json();

//     if (response.success) {
//       console.log(response);
//       const { result } = response;
//       delete result.password;
//       localStorage.setItem("restaurantUser", JSON.stringify(result));
//       router.push("/restaurant/dashboard");
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
//       <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
//         <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
//           <div className="mt-12 flex flex-col items-center">
//             <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
//             <div className="w-full flex-1 mt-8">
//               <div className="mx-auto max-w-xs">
//                 <input
//                   className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                   type="email"
//                   placeholder="Email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                 />
//                 {
//                   passworderror && !email && <>
//                     <div>
//                       <span className="text-red-500">email is required</span>
//                     </div>
//                   </>
//                 }
//                 <input
//                   className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                   type="password"
//                   placeholder="Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                 />

//                 <input
//                   className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                   type="password"
//                   placeholder="Confirm Password"
//                   onChange={(e) => setc_password(e.target.value)}
//                   value={c_password}
//                 />
//                 {
//                   passworderror && <>
//                     <div>
//                       <span className="text-red-500">password ashould be match</span>
//                     </div>
//                   </>
//                 }
//                 <input
//                   className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                   type="text"
//                   placeholder="Restaurant Name"
//                   onChange={(e) => setName(e.target.value)}
//                   value={name}
//                 />
//                 {
//                   passworderror && !name && <>
//                     <div>
//                       <span className="text-red-500">name is required</span>
//                     </div>
//                   </>
//                 }
//                 <input
//                   className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                   type="text"
//                   placeholder="City"
//                   onChange={(e) => setCity(e.target.value)}
//                   value={city}
//                 />
//                 {
//                   passworderror && !city && <>
//                     <div>
//                       <span className="text-red-500">city is required</span>
//                     </div>
//                   </>
//                 }
//                 <input
//                   className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                   type="text"
//                   placeholder="Full Address"
//                   onChange={(e) => setAddress(e.target.value)}
//                   value={address}
//                 />
//                 {
//                   passworderror && !address && <>
//                     <div>
//                       <span className="text-red-500">address is required</span>
//                     </div>
//                   </>
//                 }
//                 <input
//                   className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                   type="text"
//                   placeholder="Contact No."
//                   onChange={(e) => setContact(e.target.value)}
//                   value={contact}
//                 />
//                 {
//                   passworderror && !contact && <>
//                     <div>
//                       <span className="text-red-500">contact is required</span>
//                     </div>
//                   </>
//                 }
//                 <button
//                   onClick={handleSignUp}
//                   className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
//                 >
//                   <svg
//                     className="w-6 h-6 -ml-2"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                     <circle cx="8.5" cy="7" r="4" />
//                     <path d="M20 8v6M23 11h-6" />
//                   </svg>
//                   <span className="ml-3">Sign Up</span>
//                 </button>
//                 <p className="mt-6 text-xs text-gray-600 text-center">
//                   I agree to abide by templatana's
//                   <a href="#" className="border-b border-gray-500 border-dotted">
//                     Terms of Service
//                   </a>
//                   and its
//                   <a href="#" className="border-b border-gray-500 border-dotted">
//                     Privacy Policy
//                   </a>
//                 </p>
//                 <p className="mt-8 text-sm text-gray-600 text-center">
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => setLogin(true)}
//                     className="text-indigo-500 hover:text-indigo-700 font-semibold"
//                   >
//                     Log in
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
//           <div
//             className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
//             style={{
//               backgroundImage:
//                 "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
//             }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantSignup;


"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantSignup = ({ setLogin }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setc_password] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(''); // New state for image path
  const [error, setError] = useState(false);
  const [passworderror, setPasswordError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.prefetch('/restaurant/dashboard');
    }
  }, [router]);

  const handleSignUp = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    if (!email || !password || !c_password || !name || !city || !address || !contact || !image) {
      setError(true);
      return;
    }

    setError(false);
    let response = await fetch('/api/restaurant/', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, city, address, contact, image }), // Send image path
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {error && !email && <div><span className="text-red-500">Email is required</span></div>}

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <input
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setc_password(e.target.value)}
                  value={c_password}
                />
                {passworderror && <div><span className="text-red-500">Passwords must match</span></div>}

                <input
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Restaurant Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                {error && !name && <div><span className="text-red-500">Name is required</span></div>}

                <input
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
                {error && !city && <div><span className="text-red-500">City is required</span></div>}

                <input
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Full Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {error && !address && <div><span className="text-red-500">Address is required</span></div>}

                <input
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Contact No."
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                />
                {error && !contact && <div><span className="text-red-500">Contact is required</span></div>}

                <input
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) => setImage(e.target.value)} // New field for image path
                  value={image}
                />
                {error && !image && <div><span className="text-red-500">Image is required</span></div>}

                <button
                  onClick={handleSignUp}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>

                <p className="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setLogin(true)}
                    className="text-indigo-500 hover:text-indigo-700 font-semibold"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignup;
