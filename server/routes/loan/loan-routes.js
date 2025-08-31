const express = require("express");
const { addLoan, getLoans } = require ("../../controllers/loan-controller.js");
const { validateLoan } = require ("../../middlewares/loanMiddleware.js");

const router = express.Router();

router.post("/add-loan", validateLoan, addLoan);   // Save Loan
router.get("/get-loan", getLoans);                // Get all loans

module.exports = router;
