import { Plane } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Plane className="w-6 h-6 md:w-8 md:h-8 text-primary-600 dark:text-primary-400" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
              Visa Checker
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

