import { useState } from "react";
import LoanForm from "../../components/Admin-View/LoanForm";

export default function LoansPage() {
  const [list] = useState([]);

  return (
    <div className="flex-1 flex flex-col p-6 space-y-8 w-full h-full">
      {/* Loan Form */}
      <div className="bg-white rounded-2xl shadow p-6 w-full">
        <LoanForm />
      </div>

      {/* Borrowers Table */}
      <div className="bg-white rounded-2xl shadow p-6 w-full flex-1 overflow-auto">
        {/* <h3 className="text-lg font-semibold mb-3">Borrowers</h3> */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <tbody>
              {list.map((l) => (
                <tr key={l._id} className="border-t">
                  <td className="p-2">{l.borrower.fullName}</td>
                  <td className="p-2">{l.borrower.phone}</td>
                  <td className="p-2">{l.item.itemName}</td>
                  <td className="p-2">Rs. {l.item.totalPrice}</td>
                  <td className="p-2">Rs. {l.monthlyInstallment}</td>
                  <td className="p-2">
                    <button className="px-2 py-1 mr-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
