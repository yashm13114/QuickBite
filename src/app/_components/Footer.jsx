import React from "react";
import './footer.css'; // Import the CSS for additional styles and animations

const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-gray-300 py-16 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/background/20241007/pngtree-restaurant-menu-with-fast-food-images-through-online-banners-social-image_16290915.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "450px"
      }}
    >
      {/* Optional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Centered Content Container */}
      <div className="relative flex items-center justify-center min-h-[450px]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-green-500 mb-4">About Us</h2>
            <p className="text-sm">
              Quality and service are at the heart of our business. We are committed to excellence in everything we do, ensuring that our customers receive only the best.
            </p>
          </div>

          {/* Location Store Section */}
          <div>
            <h2 className="text-lg font-semibold text-green-500 mb-4">Location</h2>
            <p className="text-sm">Main National Highway, Landhi, Karachi</p>
            <p className="text-sm mt-2">Phone: +72-43-000-485 485</p>
            <p className="text-sm">Email: your.email@sitename.com</p>
          </div>

          {/* New Contact Us Section */}
          <div>
            <h2 className="text-lg font-semibold text-green-500 mb-4">Contact Us</h2>
            <p className="text-sm">
              For any queries or support, please reach out. We’re here to help you with all your needs.
            </p>
            <div className="mt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Social Media and Copyright */}
      <div className="relative container mx-auto px-4 mt-12 flex justify-center items-center space-x-8 text-center">
        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="#"><i className="fab fa-facebook text-white text-xl"></i></a>
          <a href="#"><i className="fab fa-twitter text-white text-xl"></i></a>
          <a href="#"><i className="fab fa-instagram text-white text-xl"></i></a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">© 2023 Food Delivery. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
