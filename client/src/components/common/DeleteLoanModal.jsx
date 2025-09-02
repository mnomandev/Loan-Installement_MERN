import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteLoan } from "../../store/loan-slice/index"; // adjust import if path differs
import { X } from "lucide-react";
import { useToast } from "../hooks/use-toast"



const DeleteLoanModal = ({ open, loan, onClose }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  if (!open) return null;
console.log("DeleteLoanModal opened for:", loan);
 const handleDelete = async () => {
    try {
       await dispatch(deleteLoan(loan._id)).unwrap();
      toast({
        title: "Deleted",
        description: "Loan deleted successfully!",
        status: "success",
      });

      onClose(); // ✅ close modal after success
    } catch (error) {
      console.error("Failed to delete loan:", error);

      toast({
        title: "Error",
        description: error.message || "Failed to delete loan",
        status: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Delete
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this loan? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteLoanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  loan: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};



export default DeleteLoanModal;
