// backend/utils/loan-utils.js

// ✅ Date normalizer
const normalizeDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return isNaN(d) ? null : d.toISOString().split("T")[0];
};

// ✅ Loan status calculator
const calculateLoanStatus = (loan) => {
  const installments = loan.installments || [];
  const totalPaid = installments.reduce(
    (sum, inst) => sum + Number(inst.paidAmount || 0),
    0
  );

  // ✅ now totalPrice comes only from loan.item.totalPrice
  const totalPrice = Number(loan.item?.totalPrice ?? 0);
  const remaining = totalPrice - totalPaid;

  let status = "Pending";
  if (totalPaid > 0 && remaining > 0) status = "Pending";
  if (remaining <= 0 && totalPrice > 0) status = "Completed";

  return { totalPaid, remaining, status };
};

module.exports = { normalizeDate, calculateLoanStatus };
