const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherOrGuardianName: { type: String },
  cnic: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
});

const guarantorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherOrGuardianName: { type: String },
  cnic: { type: String },
  phone: { type: String },
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
  { timestamps: true } // ✅ now each installment has createdAt + updatedAt
);

const LoanSchema = new mongoose.Schema(
  {
    officeNumber: { type: String, required: true },
    borrower: borrowerSchema,
    guarantor: guarantorSchema,
    item: itemSchema,
    numberOfInstallments: { type: Number, required: true },
    monthlyInstallment: { type: Number, required: true },
    startDate: { type: Date, required: true },
    termsAccepted: { type: Boolean, default: false },
    installments: [installmentSchema],
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", LoanSchema);
module.exports = { Loan };


// const mongoose = require("mongoose");

// const borrowerSchema = new mongoose.Schema({
//   fullName: String,
//   fatherOrGuardianName: String,
//   cnic: String,
//   phone: String,
//   address: String,
// });

// const guarantorSchema = new mongoose.Schema({
//   fullName: String,
//   fatherOrGuardianName: String,
//   cnic: String,
//   phone: String,
//   address: String,
// });

// const itemSchema = new mongoose.Schema({
//   itemName: String,
//   totalPrice: Number,
//   advancePaid: Number,
//   serialNumber: String,
//   modelNumber: String,
//   engineNumber: String,
//   chassisNumber: String,
//   registrationNumber: String,
// });

// const installmentSchema = new mongoose.Schema({
//   dueDate: Date,
//   installmentAmount: Number,
//   paidDate: Date,
//   paidAmount: Number,
//   balance: Number,
//   note: String,
// });

// const LoanSchema = new mongoose.Schema(
//   {
//     officeNumber: String,
//     borrower: borrowerSchema,
//     guarantor: guarantorSchema,
//     item: itemSchema,
//     numberOfInstallments: Number,
//     monthlyInstallment: Number,
//     startDate: Date,
//     termsAccepted: { type: Boolean, default: false },
//     installments: [installmentSchema],
//   },
//   { timestamps: true }
// );

// const Loan = mongoose.model("Loan", LoanSchema);
// module.exports = { Loan };
