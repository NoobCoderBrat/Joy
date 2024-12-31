import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const History = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [transactionData, setTransactionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/transactions?filters[customer_name][$eq]=${userDetails.name}`
        );
        const data = await response.json();
        setTransactionData(data.data);
        setFilteredData(data.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, [userDetails.name]);

  useEffect(() => {
    let filtered = [...transactionData];

    // Filter by search (product name)
    if (search) {
      filtered = filtered.filter((transaction) =>
        transaction.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate)
        );
      });
    }

    // Sort by date or total
    if (sortBy === "date") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    } else if (sortBy === "total") {
      filtered = filtered.sort((a, b) => b.total - a.total); // Highest total first
    }

    setFilteredData(filtered);
  }, [search, startDate, endDate, sortBy, transactionData]);

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-md border">
        <div className="flex text-[#4B3D8F]">
          <Link to="/products">
            <h2 className="text-xl font-bold text-center me-3 hover:underline">
              Products
            </h2>
          </Link>{" "}
          /
          <h2 className="text-xl font-semibold mb-4 ms-3">
            Transaction History
          </h2>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by prod. name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm"
            >
              <option value="date">Date</option>
              <option value="total">Total</option>
            </select>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Transactions Table */}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((purchase) => (
                <tr key={purchase.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{purchase.date}</td>
                  <td className="px-4 py-2">{purchase.product_name}</td>
                  <td className="px-4 py-2">{purchase.quantity}</td>
                  <td className="px-4 py-2">₱{purchase.total.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
