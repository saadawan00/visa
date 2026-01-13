import { useState } from 'react';
import { Search, Filter, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Region, VisaStatusFilter, ExistingVisas } from '../types';

interface CountryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  regionFilter: Region | 'all';
  onRegionChange: (region: Region | 'all') => void;
  statusFilter: VisaStatusFilter;
  onStatusChange: (status: VisaStatusFilter) => void;
  existingVisas: ExistingVisas;
  onExistingVisasChange: (visas: ExistingVisas) => void;
}

const REGIONS: (Region | 'all')[] = ['all', 'Asia', 'Middle East', 'Europe', 'Americas', 'Africa', 'Oceania'];
const STATUS_FILTERS: VisaStatusFilter[] = ['all', 'visaFree', 'visaOnArrival', 'evisa', 'visaRequired'];

export function CountryFilters({
  searchQuery,
  onSearchChange,
  regionFilter,
  onRegionChange,
  statusFilter,
  onStatusChange,
  existingVisas,
  onExistingVisasChange,
}: CountryFiltersProps) {
  const [showExistingVisas, setShowExistingVisas] = useState(false);

  const toggleExistingVisa = (key: keyof ExistingVisas) => {
    onExistingVisasChange({
      ...existingVisas,
      [key]: !existingVisas[key],
    });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Support Message
      <AnimatePresence>
        {showSupportMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-4 relative"
          >
            <button
              onClick={() => setShowSupportMessage(false)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-semibold mb-1">Supporting This Free Resource</p>
                <p>
                  This site is free to use and maintained by volunteers. The information provided is for reference only. 
                  Please verify visa requirements with official government sources before traveling.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}



      {/* Existing Visas/Residency */}
      <div className="glass rounded-xl p-4">
        <button
          onClick={() => setShowExistingVisas(!showExistingVisas)}
          className="w-full flex items-center justify-between mb-2"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              I have existing visas/residency
            </span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {showExistingVisas ? 'Hide' : 'Show'}
          </span>
        </button>

        <AnimatePresence>
          {showExistingVisas && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={existingVisas.usVisa}
                  onChange={() => toggleExistingVisa('usVisa')}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">US Visa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={existingVisas.ukVisa}
                  onChange={() => toggleExistingVisa('ukVisa')}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">UK Visa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={existingVisas.schengenVisa}
                  onChange={() => toggleExistingVisa('schengenVisa')}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Schengen Visa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={existingVisas.uaeResidency}
                  onChange={() => toggleExistingVisa('uaeResidency')}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">UAE Residency</span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

            {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Filter by Region */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter by Region</h3>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => onRegionChange(region)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                regionFilter === region
                  ? 'bg-primary-600 dark:bg-primary-400 text-white shadow-lg'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {region === 'all' ? 'All Regions' : region}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Visa Status */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter by Visa Status</h3>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                statusFilter === status
                  ? 'bg-primary-600 dark:bg-primary-400 text-white shadow-lg'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {status === 'all' ? 'All Status' : status === 'visaFree' ? 'Visa Free' : status === 'visaOnArrival' ? 'Visa on Arrival' : status === 'evisa' ? 'E-Visa' : 'Visa Required'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

