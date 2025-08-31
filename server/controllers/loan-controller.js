// controllers/loan-controller.js
const {Loan} = require("../models/Loan.js");

// Add a new loan
const addLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json({ success: true, loan });
  } catch (err) {
    console.error("Error saving loan:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// (Optional) Get all loans
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });
    res.json({ success: true, loans });
  } catch (err) {
    res.status(500).json(
    { success: false,
      message: "Server error",
      error: err.message
    });
  }
};

module.exports = { addLoan, getLoans }; 