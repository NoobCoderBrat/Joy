import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customers");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading state to true when starting the request

    try {
      const response = await fetch(
        `http://localhost:1337/api/${role}?filters[email][$eq]=${email}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }
      if (data.data.length === 0) {
        setError("Wrong Credentials");
        setIsLoading(false); // Set loading state to false on error
        return;
      }
      const user = data.data[0];
      if (user.password !== password) {
        setError("Incorrect password.");
        setIsLoading(false); // Set loading state to false on error
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      if (role === "admins") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "An error occurred while logging in.");
      setIsLoading(false); // Set loading state to false on error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm border">
        <div className="flex justify-center mb-6">
          <a href="/" className="text-3xl font-bold text-[#4B3D8F]">
            Login
          </a>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customers">Customer</option>
              <option value="admins">Admin</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm">
              Show Password
            </label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 text-white rounded-lg bg-[#4B3D8F] flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-white rounded-full animate-spin"></div>
                  <p>Loading...</p>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div className="text-center mt-5">
            <p className="text-sm">
              Don't have an account? &nbsp;
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
