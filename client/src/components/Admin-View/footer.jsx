export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left: Copyright */}
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} Loan Management System. <br className="md:hidden" />
            All rights reserved to <span className="font-medium text-white">Muhammad Noman</span>.
          </p>

          {/* Right: Tech Stack */}
          <p className="text-sm sm:text-base flex items-center gap-1">
            Built with <span className="text-red-500">❤️</span> using{" "}
            <span className="font-semibold text-white">MERN Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
