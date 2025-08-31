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

const updateLoan = async (req, res) => {
  console.log("Incoming body:", req.body);
  try {
    const { id } = req.params;

    // Find loan by ID
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // ✅ Auto-calculate totals
    const installments = req.body.installments || [];
    const totalPaid =
      (req.body.item?.advancePaid || 0) +
      installments.reduce((sum, inst) => sum + (inst.paidAmount || 0), 0);

    const remaining =
      (req.body.item?.totalPrice || 0) - totalPaid;

    const status = remaining <= 0 ? "Completed" : "Pending";

    // ✅ Update loan fields
    loan.borrower = req.body.borrower || loan.borrower;
    loan.item = req.body.item || loan.item;
    loan.installments = installments;
    loan.totalPaid = totalPaid;
    loan.remaining = remaining;
    loan.status = status;

    // Save updated loan
    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (error) {
    console.error("Update Loan Error:", error);
    res.status(500).json({ message: "Server error while updating loan" });
  }
};

module.exports = { addLoan, getLoans, updateLoan }; 