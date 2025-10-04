export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} Loan Management System.{" "}
            <br className="md:hidden" />
            All rights reserved by{" "}
            <span className="font-medium text-white">Muhammad Noman</span>.
          </p>

          <p className="text-sm sm:text-base flex items-center gap-1">
            Built with <span className="text-red-500">❤️</span> using{" "}
            <span className="font-semibold text-white">MERN Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
