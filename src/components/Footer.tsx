export function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Visa Checker. Information provided for reference only.</p>
          <p className="mt-2">Please verify visa requirements with official government sources before traveling.</p>
        </div>
      </div>
    </footer>
  );
}

