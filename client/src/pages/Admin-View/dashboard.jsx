import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanStats, fetchLoans } from "../../store/loan-slice/index"; // ✅ thunk
import { DollarSign, TrendingUp, Calendar, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { transformLoan } from "../../store/utils/loanUtils"; // ✅ import utils

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // ✅ Get stats + loans from Redux
  const { loanStats, loans, isLoading, error } = useSelector((state) => state.loan);

  // Fetch stats when dashboard loads
  useEffect(() => {
    dispatch(fetchLoanStats());
    dispatch(fetchLoans());
  }, [dispatch]);

  // 🔹 Transform loans for charts only
  const transformedLoans = loans.map(transformLoan);

  // ✅ Loan status distribution
  const loanStatusData = [
    { name: "Pending", value: loanStats?.activeLoans || 0 },
    { name: "Completed", value: transformedLoans.filter((loan) => loan.status === "Completed").length },
  ];

// ✅ Generate monthly data (always 12 months Jan–Dec)
const monthlyData = (() => {
  // Step 1: Start with all months = 0
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    amount: 0,
  }));

  // Step 2: Add paid installments
  transformedLoans.forEach((loan) => {
    loan.installments
      ?.filter((inst) => inst.paidAmount > 0 && inst.paidDate)
      .forEach((inst) => {
        const date = new Date(inst.paidDate);
        const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
        months[monthIndex].amount += Number(inst.paidAmount);
      });
  });

  return months;
})();



  // ✅ Loan vs Payments chart
  const paymentsData = [
    { name: "Total Loan Amount", value: (loanStats?.totalCollected + loanStats?.totalOutstanding) || 0 },
    { name: "Collected", value: loanStats?.totalCollected || 0 },
  ];

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B"];

  if (isLoading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <DollarSign className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Total Loans</p>
            <h3 className="text-xl font-bold">{loanStats?.totalLoans || 0}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <TrendingUp className="text-green-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Collected</p>
            <h3 className="text-xl font-bold">₨{(loanStats?.totalCollected || 0).toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <Calendar className="text-orange-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Outstanding</p>
            <h3 className="text-xl font-bold">₨{(loanStats?.totalOutstanding || 0).toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <Users className="text-purple-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Active Loans</p>
            <h3 className="text-xl font-bold">{loanStats?.activeLoans || 0}</h3>
          </div>
        </div>
      </div>

     {/* Monthly Collections */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Collections</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₨${value}`} />
                  <Tooltip formatter={(value) => [`₨${value}`, "Collected"]} />
                  <Bar dataKey="amount" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
          </div>

      {/* Loan Status Distribution */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Loan Status Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={loanStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {loanStatusData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Loan Amounts vs Payments */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Loan Amounts vs Payments</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={paymentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₨${value}`} />
            <Tooltip formatter={(value) => [`₨${value}`, "Amount"]} />
            <Bar dataKey="value" fill="#22C55E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
