import LoanForm from "../../components/common/LoanForm";
export default function LoansPage() {

  return (
    <div className="flex-1 flex flex-col p-6 space-y-8 w-full h-full">
      {/* Loan Form */}
      <div className="bg-white rounded-2xl shadow p-6 w-full">
        <LoanForm />
      </div>
    </div>
  );
}
