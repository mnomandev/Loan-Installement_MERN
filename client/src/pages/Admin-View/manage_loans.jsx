import { useEffect, useState } from "react";
import { Search, Users, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans } from "../../store/loan-slice/index";
import AddLoanModal from "../../components/common/AddLoanModal";
import EditLoanModal from "../../components/common/EditLoanModal";
import DeleteLoanModal from "../../components/common/DeleteLoanModal";

const ManageLoans = () => {
  const dispatch = useDispatch();
  const { loans = [], isLoading, error } = useSelector((state) => state.loan);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editLoan, setEditLoan] = useState(null);
  const [deleteLoanData, setDeleteLoanData] = useState(null);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const filteredLoans = loans.filter((loan) => {
    const borrower = loan.borrower || {};
    return (
      borrower.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      borrower.cnic?.toLowerCase().includes(search.toLowerCase()) ||
      String(loan.item?.totalPrice || "").toLowerCase().includes(search.toLowerCase()) ||
      loan.status?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search loans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow hover:opacity-90 transition"
          >
            <Plus className="h-4 w-4" />
            New Loan
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow p-4 overflow-x-auto">
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading loans...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-8">Error: {error}</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {[
                    "Borrower",
                    "CNIC",
                    "Loan Amount",
                    "Monthly Payment",
                    "Total Paid",
                    "Remaining",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-4 text-gray-700 text-sm font-semibold uppercase tracking-wide"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-10 w-10 mb-2" />
                        <span>No loans found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan, index) => {
                    const borrower = loan.borrower || {};
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50 transition">
                        <td className="py-2 px-4">{borrower.fullName || "N/A"}</td>
                        <td className="py-2 px-4">{borrower.cnic || "N/A"}</td>
                        <td className="py-2 px-4">{loan.item?.totalPrice || "N/A"}</td>
                        <td className="py-2 px-4">{loan.monthlyInstallment || "-"}</td>
                        <td className="py-2 px-4">{loan.totalPaid ?? 0}</td>
                        <td className="py-2 px-4">{loan.remaining ?? 0}</td>
                        <td className="py-2 px-4 capitalize">{loan.status || "Pending"}</td>
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            onClick={() => setEditLoan(loan)}
                            className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteLoanData(loan)}
                            className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading loans...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : filteredLoans.length === 0 ? (
            <div className="text-center py-10 text-gray-400 flex flex-col items-center">
              <Users className="h-10 w-10 mb-2" />
              <span>No loans found</span>
            </div>
          ) : (
            filteredLoans.map((loan, index) => {
              const borrower = loan.borrower || {};
              return (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 space-y-2 border border-gray-100"
                >
                  <p>
                    <span className="font-semibold">Borrower:</span>{" "}
                    {borrower.fullName || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">CNIC:</span>{" "}
                    {borrower.cnic || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Loan Amount:</span>{" "}
                    {loan.item?.totalPrice || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Monthly Payment:</span>{" "}
                    {loan.monthlyInstallment || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Total Paid:</span>{" "}
                    {loan.totalPaid ?? 0}
                  </p>
                  <p>
                    <span className="font-semibold">Remaining:</span>{" "}
                    {loan.remaining ?? 0}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {loan.status || "Pending"}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setEditLoan(loan)}
                      className="flex-1 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteLoanData(loan)}
                      className="flex-1 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modals */}
      <AddLoanModal open={showAddModal} onClose={() => setShowAddModal(false)} />
      <EditLoanModal open={!!editLoan} loan={editLoan} onClose={() => setEditLoan(null)} />
      <DeleteLoanModal open={!!deleteLoanData} loan={deleteLoanData} onClose={() => setDeleteLoanData(null)} />
    </div>
  );
};

export default ManageLoans;
