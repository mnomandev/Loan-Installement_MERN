const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherOrGuardianName: { type: String },
  cnic: { type: String, required: true, match: /^[0-9]{13}$/, index: true }, // CNIC must be 13 digits
  phone: { type: String, match: /^[0-9]{11}$/ }, // Pakistani 11-digit phone
  address: { type: String },
});

const guarantorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherOrGuardianName: { type: String },
  cnic: { type: String, match: /^[0-9]{13}$/, index: true },
  phone: { type: String, match: /^[0-9]{11}$/ },
  address: { type: String },
});

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  advancePaid: { type: Number, default: 0 },
  serialNumber: { type: String },
  modelNumber: { type: String },
  engineNumber: { type: String },
  chassisNumber: { type: String },
  registrationNumber: { type: String },
});

const installmentSchema = new mongoose.Schema(
  {
    dueDate: { type: Date, required: true },
    installmentAmount: { type: Number, required: true },
    paidDate: { type: Date }, // nullable → only filled when paid
    paidAmount: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

const LoanSchema = new mongoose.Schema(
  {
    officeNumber: { type: String, required: true, index: true },
    borrower: borrowerSchema,
    guarantor: guarantorSchema,
    item: itemSchema,
    numberOfInstallments: { type: Number, required: true },
    monthlyInstallment: { type: Number, required: true },
    startDate: { type: Date, required: true },
    termsAccepted: { type: Boolean, default: false },
    installments: [installmentSchema],

    // ✅ Loan status to track at dashboard level
   status: {
  type: String,
  enum: ["Pending", "Completed"],
  default: "Pending",
  index: true,
},

  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", LoanSchema);
module.exports = { Loan };
