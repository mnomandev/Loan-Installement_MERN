// src/utils/loanUtils.js

// ✅ Date normalizer (safe YYYY-MM-DD format)
export const normalizeDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return isNaN(d) ? null : d.toISOString().split("T")[0];
};

// ✅ Loan status calculator (only Pending / Completed)
export const calculateLoanStatus = (loan) => {
  const installments = loan.installments || [];
  const totalPaid = installments.reduce(
    (sum, inst) => sum + Number(inst.paidAmount || 0),
    0
  );

  const totalPrice = Number(loan.item?.totalPrice ?? loan.totalPrice ?? 0);
  const remaining = totalPrice - totalPaid;

  let status = "Pending"; // default
  if (remaining <= 0 && totalPrice > 0) {
    status = "Completed";
  }

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
    borrower: loan.borrower || {},
    guarantor: loan.guarantor || {},
    item: loan.item || {},
    startDate: normalizeDate(loan.startDate),
    installments,
    totalPaid,
    remaining,
    status, // ✅ Always only "Pending" or "Completed"
  };
};
