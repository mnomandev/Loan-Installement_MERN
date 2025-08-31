const express = require("express");
const { addLoan, getLoans,updateLoan } = require ("../../controllers/loan-controller.js");
const { validateNewLoan, validateUpdateLoan } = require ("../../middlewares/loanMiddleware.js");

const router = express.Router();

router.post("/add-loan", validateNewLoan, addLoan);   // Save Loan
router.get("/get-loan", getLoans);                // Get all loans
router.put("/update-loan/:id", validateUpdateLoan, updateLoan); // Update Loan

module.exports = router;
