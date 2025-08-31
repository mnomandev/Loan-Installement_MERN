// middleware/loan-middleware.js
const validateLoan = (req, res, next) => {
  const { officeNumber, borrower, item } = req.body;

  if (!officeNumber) {
    return res.status(400).json({ success: false, message: "Office Number is required" });
  }

  if (!borrower?.fullName || !borrower?.cnic) {
    return res.status(400).json({ success: false, message: "Borrower full name and CNIC are required" });
  }

  if (!item?.itemName || !item?.totalPrice) {
    return res.status(400).json({ success: false, message: "Item name and total price are required" });
  }

  next();
};

module.exports = { validateLoan };