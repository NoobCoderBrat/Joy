import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:1337/api/transactions?pagination[pageSize]=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        const result = data.data;

        const uniqueBranches = [
          ...new Set(result.map((transaction) => transaction.branch_name)),
        ];
        setBranches(uniqueBranches);

        setTransactions(result);

        const filteredData = selectedBranch
          ? result.filter(
              (transaction) => transaction.branch_name === selectedBranch
            )
          : result;

        const aggregatedData = filteredData.reduce((acc, transaction) => {
          const { product_name, quantity } = transaction;
          if (!acc[product_name]) {
            acc[product_name] = { product_name, quantity: 0 };
          }
          acc[product_name].quantity += quantity;
          return acc;
        }, {});

        const topSalesData = Object.values(aggregatedData)
          .filter((sale) => sale.quantity > 0)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 20);

        setTopSales(topSalesData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedBranch]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      const query = searchQuery.toLowerCase();
      return (
        transaction.customer_name.toLowerCase().includes(query) ||
        transaction.product_name.toLowerCase().includes(query) ||
        transaction.id.toString().includes(query)
      );
    })
    .filter((transaction) =>
      selectedBranch ? transaction.branch_name === selectedBranch : true
    );

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/admin" className="text-2xl font-bold text-[#4B3D8F]">
            Admin Dashboard
          </a>
          <button
            onClick={logout}
            className="text-sm font-bold px-4 py-2 bg-[#4B3D8F] text-white rounded hover:bg-[#3A2F6C]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Transactions Section */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                className="flex-grow px-4 py-2 border rounded"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="px-4 py-2 border rounded"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white border rounded shadow">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Order ID</th>
                    <th className="py-3 px-4 border-b text-left">Customer</th>
                    <th className="py-3 px-4 border-b text-left">Product</th>
                    <th className="py-3 px-4 border-b text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <span>Loading...</span>
                      </td>
                    </tr>
                  ) : paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 border-b">{transaction.id}</td>
                        <td className="py-3 px-4 border-b">
                          {transaction.customer_name}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {transaction.product_name}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {transaction.quantity}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No transactions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Top Sales Section */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Top Sales</h2>
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Product Name</th>
                  <th className="py-3 px-4 border-b text-left">
                    Total Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSales.length > 0 ? (
                  topSales.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 border-b">
                        {sale.product_name}
                      </td>
                      <td className="py-3 px-4 border-b">{sale.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      No sales data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
