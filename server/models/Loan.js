const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  fullName: String,
  fatherOrGuardianName: String,
  cnic: String,
  phone: String,
  address: String,
});

const guarantorSchema = new mongoose.Schema({
  fullName: String,
  fatherOrGuardianName: String,
  cnic: String,
  phone: String,
  address: String,
});

const itemSchema = new mongoose.Schema({
  itemName: String,
  totalPrice: Number,
  advancePaid: Number,
  serialNumber: String,
  modelNumber: String,
  engineNumber: String,
  chassisNumber: String,
  registrationNumber: String,
});

const installmentSchema = new mongoose.Schema({
  dueDate: Date,
  installmentAmount: Number,
  paidDate: Date,
  paidAmount: Number,
  balance: Number,
  note: String,
});

const LoanSchema = new mongoose.Schema(
  {
    officeNumber: String,
    borrower: borrowerSchema,
    guarantor: guarantorSchema,
    item: itemSchema,
    numberOfInstallments: Number,
    monthlyInstallment: Number,
    startDate: Date,
    termsAccepted: { type: Boolean, default: false },
    installments: [installmentSchema],
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", LoanSchema);
module.exports = { Loan };
