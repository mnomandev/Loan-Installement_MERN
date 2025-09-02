export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-700 dark:bg-gray-900 text-sm text-white dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-10 text-xl py-10 flex justify-between items-center">
        <p>© {new Date().getFullYear()} Loan Management System. All rights reserved to Muhammad Noman.</p>
        <p className="text-xl">Built with ❤️ using MERN Stack</p>
      </div>
    </footer>
  );
}