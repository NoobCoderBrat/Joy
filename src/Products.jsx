import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { AiFillProduct } from "react-icons/ai";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const userDetails = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/products`);
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const branches = [...new Set(products.map((product) => product.branch_name))];
  const categories = [
    ...new Set(products.map((product) => product.category_name)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch
      ? product.branch_name === selectedBranch
      : true;
    const matchesCategory = selectedCategory
      ? product.category_name === selectedCategory
      : true;

    return matchesSearch && matchesBranch && matchesCategory;
  });

  const handleAddToCart = async (product) => {
    const cartData = {
      data: {
        product_name: product.product_name,
        quantity: 1,
        price: product.product_price,
        user_name: userDetails.name,
        branch_name: product.branch_name,
      },
    };
    const jsonString = JSON.stringify(cartData);
    try {
      const response = await fetch("http://localhost:1337/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product added to cart!");
        console.log(data);
        window.location.reload();
      } else {
        const errorData = await response.text();
        alert("Failed to add to cart!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };
  const handleCheckoutClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleConfirmOrder = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const cartData = {
      data: {
        product_name: selectedProduct.product_name,
        quantity: quantity,
        total: selectedProduct.product_price * quantity,
        customer_name: userDetails.name,
        date: formattedDate,
        branch_name: selectedProduct.branch_name,
      },
    };

    const jsonString = JSON.stringify(cartData);

    try {
      const response = await fetch("http://localhost:1337/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item processed:", data);
      } else {
        const errorData = await response.text();
        console.error("Failed to add item:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    alert("Item Buy Successful!");
    window.location.reload();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
  };

  return (
    <>
      <Navigation />
      <section className="bg-base-100 py-8">
        <div className="container mx-auto px-8">
          <div className="mb-8 text-end">
            <div className="flex justify-between gap-4">
              <h1 className="text-2xl font-bold flex gap-2">
                <AiFillProduct className="mt-1" />
                Our Products
              </h1>
              <div className="flex gap-3">
                <select
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="border border-[#4B3D8F] rounded-md p-2"
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-[#4B3D8F] rounded-md p-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-6 rounded-lg shadow-xl border hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-[#4B3D8F] mb-4">
                  {product.product_name}
                </h3>
                <div className="flex justify-between">
                  <p className="text-lg font-bold text-[#4B3D8F] mb-4">
                    ₱{product.product_price}
                  </p>
                  <span
                    className="text-[#4B3D8F] hover:text-[#3D2F7F] cursor-pointer underline"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleCheckoutClick(product)}
                    className="bg-[#4B3D8F] hover:bg-[#3D2F7F] font-bold text-white px-4 py-2 rounded-md w-full"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <li>Shop Products</li>
                <li>Purchase History</li>
                <li>About Us</li>
                <li>Contact Us</li>
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

      {/* Modal Layout - Updated */}
      {isModalVisible && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-8 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#4B3D8F] font-bold text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#4B3D8F] mb-6 text-center">
              Review Your Order
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  className="w-full h-auto rounded-md object-cover"
                  src={selectedProduct.image}
                  alt={selectedProduct.product_name}
                />
              </div>

              {/* Product Information */}
              <div className="flex flex-col justify-between w-full md:w-2/3">
                <h3 className="text-xl font-semibold text-[#4B3D8F] mb-4">
                  {selectedProduct.product_name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>
                <p className="text-lg font-bold text-[#4B3D8F] mb-4">
                  Price: {selectedProduct.product_price}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <label
                    htmlFor="quantity"
                    className="text-sm text-[#4B3D8F] font-medium"
                  >
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={handleQuantityChange}
                    className="border border-[#4B3D8F] rounded-md p-2 w-20 text-center"
                  />
                </div>

                {/* Total Price Display */}
                <div className="text-sm text-[#4B3D8F] mb-6">
                  <p>
                    <strong>Total Quantity:</strong> {quantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₱
                    {(
                      parseFloat(
                        selectedProduct.product_price.replace("₱", "").trim()
                      ) * quantity
                    ).toFixed(2)}
                  </p>
                </div>

                {/* Confirm Order Button */}
                <div className="text-right">
                  <button
                    onClick={handleConfirmOrder}
                    className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-6 py-3 rounded-md w-full md:w-auto"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
