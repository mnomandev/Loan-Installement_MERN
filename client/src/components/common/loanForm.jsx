import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addLoan, updateLoan } from "../../store/loan-slice/index.js";
import { useToast } from "../hooks/use-toast.js";

LoanForm.propTypes = {
  initial: PropTypes.object, // if present → edit mode
  onClose: PropTypes.func, // optional callback on form close
};

const Input = ({ label, required, children }) => (
  <label className="flex flex-col gap-1 text-sm font-medium">
    <span>
      {label} {required && <span className="text-red-600">*</span>}
    </span>
    {children}
  </label>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default function LoanForm({ initial, onClose }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isLoading, error } = useSelector((state) => state.loan);

  const isEditMode = Boolean(initial?._id); // ✅ detect edit mode

  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      officeNumber: "",
      borrower: {
        fullName: "",
        fatherOrGuardianName: "",
        cnic: "",
        phone: "",
        address: "",
      },
      guarantor: {
        fullName: "",
        fatherOrGuardianName: "",
        cnic: "",
        phone: "",
        address: "",
      },
      item: {
        itemName: "",
        totalPrice: 0,
        advancePaid: 0,
        serialNumber: "",
        modelNumber: "",
        engineNumber: "",
        chassisNumber: "",
        registrationNumber: "",
      },
      numberOfInstallments: 12,
      monthlyInstallment: 0,
      startDate: new Date().toISOString().slice(0, 10),
      termsAccepted: false,
      installments: [],
      ...(initial || {}), // ✅ prefill for edit
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "installments",
  });

  const price = watch("item.totalPrice");
  const advance = watch("item.advancePaid");

  const onSubmit = async (data) => {
  try {
    if (isEditMode) {
      await dispatch(updateLoan({ id: initial._id, formData: data })).unwrap();
      toast({
        title: "Updated",
        description: "Loan updated successfully!",
        status: "success",
      });
      // only close modal on edit
       onClose?.();
    } else {
      await dispatch(addLoan(data)).unwrap();

      toast({
        title: "Success",
        description: "Loan added successfully!",
        status: "success",
      });

      reset(); // only clear form on add
      onClose?.();
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error?.message || "Failed to save loan.",
      status: "error",
    });
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl"
    >
      <h2 className="md:col-span-2 text-2xl font-semibold">
        Loan & Installment Form
      </h2>

      {/* --- Office / Start --- */}
      <div className="flex gap-4">
        <Input label="Account No.">
          <input className="input" {...register("officeNumber")} />
        </Input>
        <Input label="Start Date">
          <input
            type="date"
            className="input"
            {...register("startDate", { required: false })}
          />
        </Input>
      </div>

      {/* --- Borrower --- */}
      <div className="md:col-span-2 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Borrower Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Full Name">
            <input className="input" {...register("borrower.fullName")} />
          </Input>
          <Input label="Father/Guardian Name">
            <input
              className="input"
              {...register("borrower.fatherOrGuardianName")}
            />
          </Input>
          <Input label="CNIC/National ID">
            <input className="input" {...register("borrower.cnic")} />
          </Input>
          <Input label="Phone">
            <input className="input" {...register("borrower.phone")} />
          </Input>
          <Input label="Address">
            <input className="input" {...register("borrower.address")} />
          </Input>
        </div>
      </div>

      {/* --- Guarantor --- */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Guarantor Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Full Name">
            <input className="input" {...register("guarantor.fullName")} />
          </Input>
          <Input label="Father/Guardian Name">
            <input
              className="input"
              {...register("guarantor.fatherOrGuardianName")}
            />
          </Input>
          <Input label="CNIC/National ID">
            <input className="input" {...register("guarantor.cnic")} />
          </Input>
          <Input label="Phone">
            <input className="input" {...register("guarantor.phone")} />
          </Input>
          <Input label="Address">
            <input className="input" {...register("guarantor.address")} />
          </Input>
        </div>
      </div>

      {/* --- Item --- */}
      <div className="md:col-span-2 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Item / Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Item">
            <input className="input" {...register("item.itemName")} />
          </Input>
          <Input label="Total Price">
            <input
              type="number"
              step="0.01"
              className="input"
              {...register("item.totalPrice", { valueAsNumber: true })}
            />
          </Input>
          <Input label="Advance Paid">
            <input
              type="number"
              step="0.01"
              className="input"
              {...register("item.advancePaid", { valueAsNumber: true })}
            />
          </Input>
          <Input label="Serial Number">
            <input className="input" {...register("item.serialNumber")} />
          </Input>
          <Input label="Model Number">
            <input className="input" {...register("item.modelNumber")} />
          </Input>
          <Input label="Engine Number">
            <input className="input" {...register("item.engineNumber")} />
          </Input>
          <Input label="Chassis Number">
            <input className="input" {...register("item.chassisNumber")} />
          </Input>
          <Input label="Registration Number">
            <input className="input" {...register("item.registrationNumber")} />
          </Input>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Net Payable = {(price || 0) - (advance || 0)}
        </p>
      </div>

      {/* --- Installment Plan --- */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Installment Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Number of Installments">
            <input
              type="number"
              className="input"
              {...register("numberOfInstallments", { valueAsNumber: true })}
            />
          </Input>
          <Input label="Monthly Installment">
            <input
              type="number"
              className="input"
              {...register("monthlyInstallment", { valueAsNumber: true })}
            />
          </Input>
          <Input label="Terms Accepted">
            <input type="checkbox" className="h-5 w-5" {...register("termsAccepted")} />
          </Input>
        </div>
      </div>

      {/* --- Installment Ledger --- */}
      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Installment Ledger (optional)</h3>
          <button
            type="button"
            className="px-3 py-2 rounded-xl shadow"
            onClick={() =>
              append({
                dueDate: new Date().toISOString().slice(0, 10),
                installmentAmount: 0,
              })
            }
          >
            Add Row
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Due Date</th>
                <th className="p-2">Installment</th>
                <th className="p-2">Paid On</th>
                <th className="p-2">Paid</th>
                <th className="p-2">Balance</th>
                <th className="p-2">Note</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f, idx) => (
                <tr key={f.id} className="border-t">
                  <td className="p-2">
                    <input type="date" className="input" {...register(`installments.${idx}.dueDate`)} />
                  </td>
                  <td className="p-2">
                    <input type="number" className="input" {...register(`installments.${idx}.installmentAmount`, { valueAsNumber: true })} />
                  </td>
                  <td className="p-2">
                    <input type="date" className="input" {...register(`installments.${idx}.paidDate`)} />
                  </td>
                  <td className="p-2">
                    <input type="number" className="input" {...register(`installments.${idx}.paidAmount`, { valueAsNumber: true })} />
                  </td>
                  <td className="p-2">
                    <input type="number" className="input" {...register(`installments.${idx}.balance`, { valueAsNumber: true })} />
                  </td>
                  <td className="p-2">
                    <input className="input" {...register(`installments.${idx}.note`)} />
                  </td>
                  <td className="p-2">
                    <button type="button" className="px-2 py-1 rounded" onClick={() => remove(idx)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* --- Submit --- */}
      <div className="md:col-span-2 flex gap-3 justify-end">
        <button type="submit" className="px-4 py-2 rounded-2xl shadow">
          {isLoading ? "Saving..." : isEditMode ? "Update Loan" : "Save Loan"}
        </button>
      </div>

      {error && <p className="md:col-span-2 text-red-600 text-sm">⚠ {error}</p>}

      <style>{`.input{border:1px solid #e5e7eb;border-radius:0.75rem;padding:0.5rem 0.75rem;}`}</style>
    </form>
  );
}
