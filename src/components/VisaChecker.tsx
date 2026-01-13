import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CountrySelector } from './CountrySelector';
import { VisaSummaryCards } from './VisaSummaryCards';
import { CountryFilters } from './CountryFilters';
import { CountryList } from './CountryList';
import { VisaModal } from './VisaModal';
import { Country, VisaRequirement, VisaData, Region, VisaStatusFilter, ExistingVisas } from '../types';
import visaData from '../data/visaData.json';
import { calculateVisaStatistics, filterCountries, applyExistingVisas } from '../utils/visaUtils';

const visaDataTyped = visaData as VisaData;

export function VisaChecker() {
  const [originCountry, setOriginCountry] = useState<Country | null>(null);
  const [destinationCountry, setDestinationCountry] = useState<Country | null>(null);
  const [requirement, setRequirement] = useState<VisaRequirement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<Region | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<VisaStatusFilter>('all');
  const [existingVisas, setExistingVisas] = useState<ExistingVisas>({
    usVisa: false,
    ukVisa: false,
    schengenVisa: false,
    uaeResidency: false,
  });

  const allCountries = Object.values(visaDataTyped.countries);

  // Calculate statistics
  const statistics = useMemo(
    () => calculateVisaStatistics(originCountry, allCountries, visaDataTyped, existingVisas),
    [originCountry, existingVisas]
  );

  // Filter countries
  const filteredCountries = useMemo(
    () =>
      filterCountries(
        allCountries,
        originCountry,
        visaDataTyped,
        searchQuery,
        regionFilter,
        statusFilter,
        existingVisas
      ),
    [originCountry, searchQuery, regionFilter, statusFilter, existingVisas]
  );

  const checkVisa = (country: Country) => {
    if (!originCountry || !country) return;

    const key = `${originCountry.code}->${country.code}`;
    let visaReq = visaDataTyped.requirements[key] || null;
    
    // Apply existing visas if available
    if (visaReq && existingVisas) {
      visaReq = applyExistingVisas(visaReq, originCountry.code, country, existingVisas);
    }
    
    setRequirement(visaReq);
    setDestinationCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
            Check Visa Requirements
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select your origin country to see visa requirements for destinations worldwide
          </p>
        </motion.div>

        {/* Origin Country Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <CountrySelector
            countries={allCountries}
            selectedCountry={originCountry}
            onSelect={setOriginCountry}
            placeholder="Select origin country"
            label="Origin Country"
          />
        </motion.div>

        {/* Summary Statistics Cards */}
        {originCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VisaSummaryCards statistics={statistics} />
          </motion.div>
        )}

        {/* Filters and Country List */}
        {originCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CountryFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              regionFilter={regionFilter}
              onRegionChange={setRegionFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              existingVisas={existingVisas}
              onExistingVisasChange={setExistingVisas}
            />

            <CountryList
              countries={filteredCountries}
              originCountry={originCountry}
              requirements={visaDataTyped.requirements}
              onSelectCountry={checkVisa}
            />
          </motion.div>
        )}

        {/* Visa Modal */}
        {originCountry && destinationCountry && (
          <VisaModal
            isOpen={isModalOpen}
            onClose={closeModal}
            originCountry={originCountry}
            destinationCountry={destinationCountry}
            requirement={requirement}
          />
        )}
      </div>
    </div>
  );
}
