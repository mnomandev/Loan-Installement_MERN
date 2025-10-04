import { Outlet } from "react-router-dom";
import { CreditCard, Banknote, TrendingUp, ShieldCheck } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Gradient Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 w-1/2 px-16 text-white">
        <div className="max-w-md space-y-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight leading-snug">
            Loan & Installment Management System
          </h1>
          <p className="text-sm opacity-95 font-medium leading-relaxed">
            Simplify your loan tracking, manage installments, and stay on top of
            repayments — all in one secure platform.
          </p>

          <div className="grid grid-cols-2 gap-8 text-left text-base">
            <div className="flex items-center gap-3">
              <CreditCard className="h-7 w-7 text-yellow-300" />
              <span>Easy installment tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <Banknote className="h-7 w-7 text-green-300" />
              <span>Secure loan disbursement</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-7 w-7 text-pink-300" />
              <span>Track growth & progress</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-blue-300" />
              <span>Reliable & role-based access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Outlet Section */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
