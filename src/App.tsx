import { useState } from 'react';
import { FileSearch, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VisaChecker } from './components/VisaChecker';
import { ApplicationGuide } from './components/ApplicationGuide';

type Tab = 'checker' | 'guide';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('checker');

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      <main className="flex-1">
        {/* Tab Navigation */}
        <div className="container mx-auto px-4 pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 md:gap-4 mb-8">
              <button
                onClick={() => setActiveTab('checker')}
                className={`flex-1 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base ${
                  activeTab === 'checker'
                    ? 'bg-primary-600 dark:bg-primary-400 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FileSearch className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Check Visa Requirements</span>
                <span className="sm:hidden">Check</span>
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base ${
                  activeTab === 'guide'
                    ? 'bg-primary-600 dark:bg-primary-400 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Application Guide</span>
                <span className="sm:hidden">Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'checker' ? (
            <motion.div
              key="checker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VisaChecker />
            </motion.div>
          ) : (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ApplicationGuide />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;

