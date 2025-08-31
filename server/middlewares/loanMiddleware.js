// middleware/loan-middleware.js
// Validation for CREATE (strict)
const validateNewLoan = (req, res, next) => {
  const body = req.body || {};
  const { officeNumber, borrower = {}, item = {} } = body;

  if (!officeNumber) {
    return res.status(400).json({ success: false, message: "Office Number is required" });
  }
  if (!borrower.fullName || !borrower.cnic) {
    return res.status(400).json({ success: false, message: "Borrower full name and CNIC are required" });
  }
  if (!item.itemName || !item.totalPrice) {
    return res.status(400).json({ success: false, message: "Item name and total price are required" });
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
