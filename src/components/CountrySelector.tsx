import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Country } from '../types';

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
  placeholder: string;
  label: string;
}

const POPULAR_COUNTRIES = ['US', 'CA', 'GB', 'DE', 'PK'];

export function CountrySelector({
  countries,
  selectedCountry,
  onSelect,
  placeholder,
  label,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCountries = countries.filter((c) => POPULAR_COUNTRIES.includes(c.code));

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 glass rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 transition-all duration-200 flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <img
                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                alt={selectedCountry.name}
                className="w-5 h-4 object-cover rounded shadow-sm flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-gray-900 dark:text-gray-100">{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 glass-strong rounded-xl shadow-2xl max-h-96 overflow-hidden"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 text-gray-900 dark:text-gray-100"
                  autoFocus
                />
              </div>
            </div>

            {searchQuery === '' && popularCountries.length > 0 && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                  Popular Countries
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        onSelect(country);
                        setIsOpen(false);
                      }}
                      className="px-3 py-1.5 text-sm glass-card bg-primary-50/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100/50 dark:hover:bg-primary-900/40 transition-colors flex items-center gap-2"
                    >
                      <img
                        src={`https://flagcdn.com/w16/${country.code.toLowerCase()}.png`}
                        alt={country.name}
                        className="w-4 h-3 object-cover rounded shadow-sm flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-y-auto max-h-64">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onSelect(country);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors flex items-center gap-3"
                  >
                    <img
                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                      alt={country.name}
                      className="w-5 h-4 object-cover rounded shadow-sm flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {country.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{country.code}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

