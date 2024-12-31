import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

function UserDashboard() {
  const [isCartVisible, setCartVisible] = useState(false);

  const handleCartClick = () => setCartVisible(true);

  return (
    <div>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-black bg-opacity-15 z-50 px-5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-white hover:underline tracking-widest"
          >
            Bazzar.
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li className="flex items-center space-x-1">
                <span className="text-white text-lg">🕒</span>
                <a
                  href="/history"
                  className="text-white font-bold hover:underline"
                >
                  Purchased
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <span className="text-white text-lg">🛒</span>
                <span
                  className="text-white font-bold hover:underline cursor-pointer"
                  onClick={handleCartClick}
                >
                  Cart
                </span>
              </li>
              <Link to="/">
                <li className="flex items-center space-x-2">
                  <button className="rounded-full bg-white px-5 p-1">
                    Logout
                  </button>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mt-10">
              Discover Happiness, Delivered to Your Doorstep....
            </h1>
            <p className="text-lg text-white max-w-xl mx-auto">
              One-stop shop for all your needs. Discover the latest trends,
              unbeatable deals, and convenience delivered to your doorstep.
            </p>
            <Link to="/products">
              <button className="bg-[#4B3D8F] hover:bg-[#3D2F7F] mt-8 text-white px-8 py-3 text-lg rounded-md flex gap-2 mx-auto">
                Browse Products
                <FaArrowRightLong className="mt-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#4B3D8F] mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white p-4 shadow-lg rounded-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full object-cover rounded-md mb-4"
              />
            </div>
            <div className="bg-white p-4 shadow-lg rounded-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full object-cover rounded-md mb-4"
              />
            </div>
            <div className="bg-white p-4 shadow-lg rounded-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full object-cover rounded-md mb-4"
              />
            </div>
            <div className="bg-white p-4 shadow-lg rounded-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full object-cover rounded-md mb-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#4B3D8F] mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-md">
              <p className="text-gray-700 mb-4">
                "Amazing quality and fast delivery! I'll definitely shop here
                again."
              </p>
              <h3 className="text-lg font-bold text-[#4B3D8F]">- Sarah K.</h3>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-md">
              <p className="text-gray-700 mb-4">
                "Great prices and fantastic customer service!"
              </p>
              <h3 className="text-lg font-bold text-[#4B3D8F]">- John D.</h3>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-md">
              <p className="text-gray-700 mb-4">
                "Absolutely love the variety of products available. Will shop
                again!"
              </p>
              <h3 className="text-lg font-bold text-[#4B3D8F]">- Alex T.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-center text-[#4B3D8F] mb-8">
            Why Shop with Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl text-[#4B3D8F]">🚚</span>
              </div>
              <h3 className="text-lg font-bold">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy free shipping on all orders above $50.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl text-[#4B3D8F]">📞</span>
              </div>
              <h3 className="text-lg font-bold">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our team is always here to help you with your queries, anytime.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl text-[#4B3D8F]">🔄</span>
              </div>
              <h3 className="text-lg font-bold">Easy Returns</h3>
              <p className="text-gray-600">
                Hassle-free returns within 30 days for a smooth shopping
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-center text-[#4B3D8F] mb-8">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Sign up for exclusive offers and the latest updates directly to your
            inbox.
          </p>
          <form className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border w-full md:w-auto"
            />
            <button className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-6 py-2 rounded-md">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#4B3D8F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Bazzar</h3>
              <p className="text-gray-300">
                Bazzar is your one-stop shop for all your needs. Discover the
                latest trends, unbeatable deals, and convenience delivered to
                your doorstep.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="hover:underline">
                    Shop Products
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="hover:underline">
                    Purchase History
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-300">Email: support@bazzar.com</p>
              <p className="text-gray-300">Phone: +1 (800) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#4B3D8F]"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#4B3D8F]"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#4B3D8F]"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#4B3D8F]"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Bazzar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Optional: Cart Modal */}
      {isCartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <p className="text-gray-700">Your cart is empty.</p>
            <button
              className="mt-4 px-6 py-2 bg-[#4B3D8F] text-white rounded-md"
              onClick={() => setCartVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
