// src/utils/loanUtils.js

// ✅ Date normalizer
export const normalizeDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD
};

// ✅ Loan transformer (adds derived fields)
export const transformLoan = (loan) => {
  const installments = loan.installments?.map((inst) => ({
    ...inst,
    dueDate: normalizeDate(inst.dueDate),
    paidDate: normalizeDate(inst.paidDate),
  })) || [];

  // total paid = sum of all paid amounts
  const totalPaid = installments.reduce(
    (sum, inst) => sum + (inst.paidAmount || 0),
    0
  );

  const remaining = (loan.totalPrice || 0) - totalPaid;

  const status = remaining <= 0 ? "Completed" : "Pending";

  return {
    ...loan,
    startDate: normalizeDate(loan.startDate),
    installments,
    totalPaid,
    remaining,
    status,
  };
};

//loan status helper
export const calculateLoanStats = (loan) => {
  const totalPaid = loan.installments?.reduce(
    (sum, inst) => sum + (inst.paidAmount || 0),
    0
  ) || 0;

  const totalPrice = loan.item?.totalPrice || 0;
  const remaining = totalPrice - totalPaid;

  let status = "";
  if (remaining === 0) status = "Completed";
  else if (totalPaid === 0) status = "Pending...";

  return { totalPaid, remaining, status };
};
