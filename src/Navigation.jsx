import { useState } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isCartVisible, setCartVisible] = useState(false);

  const handleCartClick = () => setCartVisible(true);
  const handleCloseCart = () => setCartVisible(false);

  return (
    <>
      <header className="border-b bg-[#4B3D8F]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="/dashboard"
            className="text-2xl font-bold text-white tracking-widest"
          >
            Bazzar.
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
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

      {/* Cart Modal */}
      {isCartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative max-h-[80vh] overflow-auto">
            <button
              onClick={handleCloseCart}
              className="absolute top-4 right-4 text-[#4B3D8F] font-bold"
            >
              ✕
            </button>
            <Cart onClose={handleCloseCart} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
