// Validation for CREATE (strict)
const validateNewLoan = (req, res, next) => {
  const body = req.body || {};
  const { officeNumber, borrower = {}, guarantor = {}, item = {} } = body;

  if (!officeNumber) {
    return res.status(400).json({ success: false, message: "Office Number is required" });
  }

  // Borrower required fields
  if (!borrower.fullName || !borrower.cnic) {
    return res.status(400).json({
      success: false,
      message: "Borrower full name and CNIC are required",
    });
  }

  // Guarantor required fields (⚠️ remove this if you want optional guarantors)
  if (!guarantor.fullName || !guarantor.cnic) {
    return res.status(400).json({
      success: false,
      message: "Guarantor full name and CNIC are required",
    });
  }

  // Item required fields
  if (!item.itemName || typeof item.totalPrice !== "number" || item.totalPrice <= 0) {
    return res.status(400).json({
      success: false,
      message: "Item name and valid total price are required",
    });
  }

  // Loan terms
  if (!body.numberOfInstallments || body.numberOfInstallments <= 0) {
    return res.status(400).json({ success: false, message: "Number of installments is required" });
  }
  if (!body.monthlyInstallment || body.monthlyInstallment <= 0) {
    return res.status(400).json({ success: false, message: "Monthly installment is required" });
  }
  if (!body.startDate) {
    return res.status(400).json({ success: false, message: "Start date is required" });
  }

  next();
};


// Validation for UPDATE (lenient)
const validateUpdateLoan = (req, res, next) => {
  const body = req.body || {};

  if (body.officeNumber !== undefined && !body.officeNumber) {
    return res.status(400).json({ success: false, message: "Office Number cannot be empty" });
  }

  if (body.borrower) {
    if (body.borrower.fullName !== undefined && !body.borrower.fullName) {
      return res.status(400).json({ success: false, message: "Borrower full name cannot be empty" });
    }
    if (body.borrower.cnic !== undefined && !body.borrower.cnic) {
      return res.status(400).json({ success: false, message: "Borrower CNIC cannot be empty" });
    }
  }

  if (body.guarantor) {
    if (body.guarantor.fullName !== undefined && !body.guarantor.fullName) {
      return res.status(400).json({ success: false, message: "Guarantor full name cannot be empty" });
    }
    if (body.guarantor.cnic !== undefined && !body.guarantor.cnic) {
      return res.status(400).json({ success: false, message: "Guarantor CNIC cannot be empty" });
    }
  }

  if (body.item) {
    if (body.item.itemName !== undefined && !body.item.itemName) {
      return res.status(400).json({ success: false, message: "Item name cannot be empty" });
    }
    if (body.item.totalPrice !== undefined && !body.item.totalPrice) {
      return res.status(400).json({ success: false, message: "Total price cannot be empty" });
    }
  }

  next();
};

module.exports = { validateNewLoan, validateUpdateLoan };
