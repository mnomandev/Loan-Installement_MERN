// src/utils/loanUtils.js

// ✅ Date normalizer
export const normalizeDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return isNaN(d) ? null : d.toISOString().split("T")[0]; // YYYY-MM-DD
};

// ✅ Loan status calculator
export const calculateLoanStatus = (loan) => {
  const installments = loan.installments || [];
  const totalPaid = installments.reduce(
    (sum, inst) => sum + Number(inst.paidAmount || 0),
    0
  );

  const totalPrice = Number(loan.totalPrice ?? loan.item?.totalPrice ?? 0);
  const remaining = totalPrice - totalPaid;

  let status = "Pending";
  if (remaining <= 0 && totalPrice > 0) status = "Completed";

  return { totalPaid, remaining, status };
};

// ✅ Loan transformer (adds derived + normalized fields)
export const transformLoan = (loan) => {
  const installments =
    loan.installments?.map((inst) => ({
      ...inst,
      dueDate: normalizeDate(inst.dueDate),
      paidDate: normalizeDate(inst.paidDate),
    })) || [];

  const { totalPaid, remaining, status } = calculateLoanStatus({
    ...loan,
    installments,
  });

  return {
    ...loan,
    startDate: normalizeDate(loan.startDate),
    installments,
    totalPaid,
    remaining,
    status,
  };
};
