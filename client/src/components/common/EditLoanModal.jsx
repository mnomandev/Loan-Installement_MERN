// src/components/loans/EditLoanModal.jsx
import { X } from "lucide-react";
import LoanForm from "./LoanForm";
import PropTypes from "prop-types";

EditLoanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loan: PropTypes.object,
};

export default function EditLoanModal({ open, onClose, loan }) {
  if (!open || !loan) return null; // only open if loan exists

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

        {/* Pass loan data as initial values */}
        <LoanForm initial={loan} onClose={onClose} />
      </div>
    </div>
  );
}
