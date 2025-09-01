import { useEffect, useState } from "react";
import { Search, Users, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans } from "../../store/loan-slice/index";
import AddLoanModal from "../../components/common/AddLoanModal";
import EditLoanModal from "../../components/common/EditLoanModal";
import { calculateLoanStats } from "../../store/utils/loanUtils"

const ManageLoans = () => {
  const dispatch = useDispatch();
  const { loans = [], loading, error } = useSelector((state) => state.loan);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const filteredLoans = loans.filter((loan) => {
    const applicant = loan.applicant || {};
    return (
      applicant.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      applicant.cnic?.toLowerCase().includes(search.toLowerCase()) ||
      String(loan.amount).toLowerCase().includes(search.toLowerCase()) ||
      loan.status?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search loans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add Loan */}
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Loan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading loans...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">BORROWER</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">CNIC</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">LOAN AMOUNT</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">MONTHLY PAYMENT</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">TOTAL PAID</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">REMAINING</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">STATUS</th>
                <th className="py-2 px-4 text-gray-600 text-sm font-semibold">ACTIONS</th>
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
                filteredLoans.map((loan, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{loan.borrower?.fullName || "N/A"}</td>
                    <td className="py-2 px-4">{loan.borrower?.cnic || "N/A"}</td>
                    <td className="py-2 px-4">{loan.item?.totalPrice || "N/A"}</td>
                    <td className="py-2 px-4">{loan.monthlyInstallment || "-"}</td>
                    <td className="py-2 px-4">
                      {calculateLoanStats(loan).totalPaid}
                    </td>
                    <td className="py-2 px-4">
                       {calculateLoanStats(loan).remaining}
                    </td>
                    <td className="py-2 px-4"> {calculateLoanStats(loan).status}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => setEditLoan(loan)} // ✅ open edit modal
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 shadow transition"
                      >
                        Edit
                      </button>
                      <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-gray-500 hover:bg-red-600 shadow transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <AddLoanModal open={showAddModal} onClose={() => setShowAddModal(false)} />
      <EditLoanModal open={!!editLoan} loan={editLoan} onClose={() => setEditLoan(null)} />
    </div>
  );
};

export default ManageLoans;


