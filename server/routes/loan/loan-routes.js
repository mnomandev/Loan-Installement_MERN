const express = require("express");
const {
  addLoan,
  getLoans,
  updateLoan,
  deleteLoan,
  getLoanStats, // ✅ import new controller
} = require("../../controllers/loan-controller.js");

const { validateNewLoan, validateUpdateLoan } = require("../../middlewares/loanMiddleware.js");

const router = express.Router();

// Create Loan
router.post("/add-loan", validateNewLoan, addLoan);

// Get All Loans
router.get("/get-loans", getLoans);

// ✅ New clean route for dashboard stats
router.get("/loan-stats", getLoanStats);

// Update Loan
router.put("/update-loan/:id", validateUpdateLoan, updateLoan);

// Delete Loan
router.delete("/delete-loan/:id", deleteLoan);

module.exports = router;
