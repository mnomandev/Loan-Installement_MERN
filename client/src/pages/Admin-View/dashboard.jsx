import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanStats, fetchLoans } from "../../store/loan-slice/index";
import { DollarSign, TrendingUp, Calendar, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { transformLoan } from "../../store/utils/loanUtils";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { loanStats, loans, isLoading, error } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchLoanStats());
    dispatch(fetchLoans());
  }, [dispatch]);

  const transformedLoans = loans.map(transformLoan);

  const loanStatusData = [
    { name: "Pending", value: loanStats?.activeLoans || 0 },
    { name: "Completed", value: transformedLoans.filter((loan) => loan.status === "Completed").length },
  ];

  const monthlyData = (() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      amount: 0,
    }));
    transformedLoans.forEach((loan) => {
      loan.installments
        ?.filter((inst) => inst.paidAmount > 0 && inst.paidDate)
        .forEach((inst) => {
          const date = new Date(inst.paidDate);
          months[date.getMonth()].amount += Number(inst.paidAmount);
        });
    });
    return months;
  })();

  const paymentsData = [
    { name: "Total Loan Amount", value: (loanStats?.totalCollected + loanStats?.totalOutstanding) || 0 },
    { name: "Collected", value: loanStats?.totalCollected || 0 },
  ];

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B"];

  if (isLoading) return <p className="p-6 text-gray-600">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* === Top Stats === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Loans",
            value: loanStats?.totalLoans || 0,
            icon: DollarSign,
            color: "text-indigo-500",
          },
          {
            title: "Collected",
            value: `₨${(loanStats?.totalCollected || 0).toLocaleString()}`,
            icon: TrendingUp,
            color: "text-green-500",
          },
          {
            title: "Outstanding",
            value: `₨${(loanStats?.totalOutstanding || 0).toLocaleString()}`,
            icon: Calendar,
            color: "text-orange-500",
          },
          {
            title: "Active Loans",
            value: loanStats?.activeLoans || 0,
            icon: Users,
            color: "text-purple-500",
          },
        ].map(({ title, value, icon: Icon, color }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md transition-all duration-200"
          >
            <Icon className={`${color} w-7 h-7 shrink-0`} />
            <div>
              <p className="text-xs font-medium text-gray-500">{title}</p>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* === Charts Section === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Collections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Monthly Collections</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `₨${v}`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`₨${v}`, "Collected"]} />
              <Bar dataKey="amount" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loan Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Loan Status Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={loanStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value})`}
              >
                {loanStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Loan Amounts vs Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Loan Amounts vs Payments</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={paymentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `₨${v}`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`₨${v}`, "Amount"]} />
              <Bar dataKey="value" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
