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
  // console.log("Incoming body:", req.body);

  try {
    const { id } = req.params;

    // ✅ Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    // ✅ Prevent _id overwrite
    const cleanBody = JSON.parse(JSON.stringify(req.body));
    delete cleanBody._id;
    if (cleanBody.item) delete cleanBody.item._id;

    // Find loan by ID
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // ✅ Extract installments safely
    const installments = Array.isArray(cleanBody.installments)
      ? cleanBody.installments
      : loan.installments;

    // ✅ Auto-calculate totals
    const totalPaid =
      (cleanBody.item?.advancePaid || loan.item.advancePaid || 0) +
      installments.reduce((sum, inst) => sum + (inst.paidAmount || 0), 0);

    const totalPrice = cleanBody.item?.totalPrice || loan.item.totalPrice || 0;
    const remaining = totalPrice - totalPaid;
    // console.log("Calculated remaining:", remaining);

    const status = remaining <= 0 ? "Completed" : "Pending";
    // console.log("Determined status:", status);

    // ✅ Update loan fields
    loan.borrower = cleanBody.borrower || loan.borrower;
    loan.item = cleanBody.item || loan.item;
    loan.installments = installments;
    loan.totalPaid = totalPaid;
    loan.remaining = remaining;
    loan.status = status;

    // Save updated loan
    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (error) {
    // console.error("Update Loan Error:", error);
    res.status(500).json({ message: "Server error while updating loan" });
  }
};


module.exports = { addLoan, getLoans, updateLoan }; 