const express = require("express");
const { addLoan, getLoans, updateLoan } = require("../../controllers/loan-controller.js");
const { validateNewLoan, validateUpdateLoan } = require("../../middlewares/loanMiddleware.js");

const router = express.Router();

// Create Loan
router.post("/add-loan", validateNewLoan, addLoan);

// Get All Loans
router.get("/get-loans", getLoans);

// Update Loan
router.put("/update-loan/:id", validateUpdateLoan, updateLoan);

module.exports = router;
