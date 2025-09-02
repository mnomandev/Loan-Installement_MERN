// src/controllers/loanController.js
const { Loan } = require("../models/Loan.js");
const {calculateLoanStatus, normalizeDate} = require('../utils/loan-utils.js')

// ✅ Dashboard stats controller
const getLoanStats = async (req, res) => {
  try {
    const loans = await Loan.find();

    let totalLoans = loans.length;
    let totalCollected = 0;
    let totalOutstanding = 0;
    let activeLoans = 0;

    loans.forEach((loan) => {
      const { totalPaid, remaining, status } = calculateLoanStatus(loan);
      totalCollected += totalPaid;
      totalOutstanding += remaining;
      if (status === "Pending") activeLoans++;
    });

    res.json({
      success: true,
      data: { totalLoans, totalCollected, totalOutstanding, activeLoans },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add a new loan
const addLoan = async (req, res) => {
  try {
    const body = req.body;

    // Normalize installments
    const installments = (body.installments || []).map((inst) => ({
      dueDate: normalizeDate(inst.dueDate),
      installmentAmount: Number(inst.installmentAmount) || 0,
      paidDate: normalizeDate(inst.paidDate),
      paidAmount: Number(inst.paidAmount) || 0,
      balance: Number(inst.balance) || 0,
      note: inst.note || "",
    }));

    const loan = new Loan({ ...body, installments });
    await loan.save();

    const { totalPaid, remaining, status } = calculateLoanStatus(loan);

    res.status(201).json({
      success: true,
      loan: { ...loan.toObject(), totalPaid, remaining, status },
    });
  } catch (err) {
    console.error("Error saving loan:", err);
    res.status(500).json({
      success: false,
      message: "Server error while saving loan",
      error: err.message,
    });
  }
};

// ✅ Get all loans
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });

    const enrichedLoans = loans.map((loan) => {
      const { totalPaid, remaining, status } = calculateLoanStatus(loan);
      return { ...loan.toObject(), totalPaid, remaining, status };
    });

    res.json({ success: true, loans: enrichedLoans });
  } catch (err) {
    console.error("Get Loans Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching loans",
      error: err.message,
    });
  }
};

// ✅ Delete a loan
const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    await Loan.findByIdAndDelete(id);

    res.json({
      success: true,
      id,
      message: "Loan deleted successfully",
    });
  } catch (error) {
    console.error("Delete Loan Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting loan",
      error: error.message,
    });
  }
};

// ✅ Update loan
const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Request body is empty" });
    }

    const cleanBody = JSON.parse(JSON.stringify(req.body));
    delete cleanBody._id;
    if (cleanBody.item) delete cleanBody.item._id;

    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }

    const installments = Array.isArray(cleanBody.installments)
      ? cleanBody.installments.map((inst) => ({
          dueDate: normalizeDate(inst.dueDate),
          installmentAmount: Number(inst.installmentAmount) || 0,
          paidDate: normalizeDate(inst.paidDate),
          paidAmount: Number(inst.paidAmount) || 0,
          balance: Number(inst.balance) || 0,
          note: inst.note || "",
        }))
      : loan.installments;

    // ✅ Update only allowed fields
    loan.officeNumber = cleanBody.officeNumber ?? loan.officeNumber;
    loan.borrower = cleanBody.borrower ?? loan.borrower;
    loan.guarantor = cleanBody.guarantor ?? loan.guarantor;
    loan.item = cleanBody.item ?? loan.item;
    loan.numberOfInstallments =
      cleanBody.numberOfInstallments ?? loan.numberOfInstallments;
    loan.monthlyInstallment =
      cleanBody.monthlyInstallment ?? loan.monthlyInstallment;
    loan.startDate = normalizeDate(cleanBody.startDate) ?? loan.startDate;
    loan.termsAccepted =
      typeof cleanBody.termsAccepted === "boolean"
        ? cleanBody.termsAccepted
        : loan.termsAccepted;
    loan.installments = installments;

    const updatedLoan = await loan.save();

    const { totalPaid, remaining, status } = calculateLoanStatus(updatedLoan);

    return res.json({
      success: true,
      loan: { ...updatedLoan.toObject(), totalPaid, remaining, status },
    });
  } catch (error) {
    console.error("Update Loan Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating loan",
      error: error.message,
    });
  }
};

module.exports = { addLoan, getLoans, updateLoan, deleteLoan, getLoanStats };
