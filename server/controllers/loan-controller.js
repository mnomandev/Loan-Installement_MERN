// controllers/loan-controller.js
const { Loan } = require("../models/Loan.js");

// ✅ Utility to normalize date
const normalizeDate = (d) => (d ? new Date(d) : null);

// ✅ Utility to calculate totals
const calculateLoanTotals = (loan) => {
  const installments = loan.installments || [];
  const totalPaid =
    (loan.item?.advancePaid || 0) +
    installments.reduce((sum, inst) => sum + (inst.paidAmount || 0), 0);

  const totalPrice = loan.item?.totalPrice || 0;
  const remaining = totalPrice - totalPaid;
  const status = remaining <= 0 ? "Completed" : "Pending";

  return { totalPaid, remaining, status };
};

// ✅ Add a new loan
const addLoan = async (req, res) => {
  try {
    const body = req.body;

    // Normalize installments
    const installments = (body.installments || []).map((inst) => ({
      dueDate: normalizeDate(inst.dueDate),
      installmentAmount: inst.installmentAmount || 0,
      paidDate: normalizeDate(inst.paidDate),
      paidAmount: inst.paidAmount || 0,
      balance: inst.balance || 0,
      note: inst.note || "",
    }));

    // Create loan without totals
    const loan = new Loan({
      ...body,
      installments,
    });

    await loan.save();

    // Calculate totals only for response
    const { totalPaid, remaining, status } = calculateLoanTotals(loan);

    res.status(201).json({
      success: true,
      loan: { ...loan.toObject(), totalPaid, remaining, status },
    });
  } catch (err) {
    console.error("Error saving loan:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ✅ Get all loans
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });

    // Add computed fields to each loan
    const enrichedLoans = loans.map((loan) => {
      const { totalPaid, remaining, status } = calculateLoanTotals(loan);
      return { ...loan.toObject(), totalPaid, remaining, status };
    });

    res.json({ success: true, loans: enrichedLoans });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ✅ Update existing loan
const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    // Prevent overwriting _id
    const cleanBody = JSON.parse(JSON.stringify(req.body));
    delete cleanBody._id;
    if (cleanBody.item) delete cleanBody.item._id;

    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Normalize installments
    const installments = Array.isArray(cleanBody.installments)
      ? cleanBody.installments.map((inst) => ({
          dueDate: normalizeDate(inst.dueDate),
          installmentAmount: inst.installmentAmount || 0,
          paidDate: normalizeDate(inst.paidDate),
          paidAmount: inst.paidAmount || 0,
          balance: inst.balance || 0,
          note: inst.note || "",
        }))
      : loan.installments;

    // Update fields
    loan.officeNumber = cleanBody.officeNumber || loan.officeNumber;
    loan.borrower = cleanBody.borrower || loan.borrower;
    loan.guarantor = cleanBody.guarantor || loan.guarantor;
    loan.item = cleanBody.item || loan.item;
    loan.numberOfInstallments =
      cleanBody.numberOfInstallments || loan.numberOfInstallments;
    loan.monthlyInstallment =
      cleanBody.monthlyInstallment || loan.monthlyInstallment;
    loan.startDate = normalizeDate(cleanBody.startDate) || loan.startDate;
    loan.termsAccepted =
      typeof cleanBody.termsAccepted === "boolean"
        ? cleanBody.termsAccepted
        : loan.termsAccepted;
    loan.installments = installments;

    const updatedLoan = await loan.save();

    // Calculate totals for response
    const { totalPaid, remaining, status } = calculateLoanTotals(updatedLoan);

    res.json({
      success: true,
      loan: { ...updatedLoan.toObject(), totalPaid, remaining, status },
    });
  } catch (error) {
    console.error("Update Loan Error:", error);
    res.status(500).json({
      message: "Server error while updating loan",
      error: error.message,
    });
  }
};

module.exports = { addLoan, getLoans, updateLoan };



