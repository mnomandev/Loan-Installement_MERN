// src/components/loans/AddLoanModal.jsx
import { X } from "lucide-react";
import LoanForm from "./loanForm";
import PropTypes from "prop-types";

AddLoanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function AddLoanModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Create Loan Form */}
        <LoanForm onClose={onClose} />
      </div>
    </div>
  );
}
