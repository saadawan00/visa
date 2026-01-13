import { CheckCircle, Clock, FileText, AlertCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Country, VisaRequirement } from '../types';
import { getVisaStatus } from '../utils/visaUtils';

interface CountryListProps {
  countries: Country[];
  originCountry: Country | null;
  requirements: Record<string, VisaRequirement>;
  onSelectCountry: (country: Country) => void;
}

export function CountryList({ countries, originCountry, requirements, onSelectCountry }: CountryListProps) {
  if (!originCountry) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Please select an origin country to see available destinations</p>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>No countries match your filters</p>
      </div>
    );
  }

  const getStatusIcon = (requirement: VisaRequirement | null) => {
    if (!requirement) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }

    const status = getVisaStatus(requirement);
    switch (status) {
      case 'visaFree':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'visaOnArrival':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'evisa':
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusLabel = (requirement: VisaRequirement | null) => {
    if (!requirement) return 'Visa Required';
    const status = getVisaStatus(requirement);
    switch (status) {
      case 'visaFree':
        return 'Visa Free';
      case 'visaOnArrival':
        return 'Visa on Arrival';
      case 'evisa':
        return 'E-Visa';
      default:
        return 'Visa Required';
    }
  };

  const getStatusColor = (requirement: VisaRequirement | null) => {
    if (!requirement) return 'glass-card border-red-200/50 dark:border-red-500/20 bg-red-50/30 dark:bg-red-900/10';
    const status = getVisaStatus(requirement);
    switch (status) {
      case 'visaFree':
        return 'glass-card border-green-200/50 dark:border-green-500/20 bg-green-50/30 dark:bg-green-900/10';
      case 'visaOnArrival':
        return 'glass-card border-yellow-200/50 dark:border-yellow-500/20 bg-yellow-50/30 dark:bg-yellow-900/10';
      case 'evisa':
        return 'glass-card border-blue-200/50 dark:border-blue-500/20 bg-blue-50/30 dark:bg-blue-900/10';
      default:
        return 'glass-card border-red-200/50 dark:border-red-500/20 bg-red-50/30 dark:bg-red-900/10';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {countries.map((country, index) => {
        const key = `${originCountry.code}->${country.code}`;
        const requirement = requirements[key] || null;

        return (
          <motion.button
            key={country.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelectCountry(country)}
            className={`text-left p-4 rounded-xl border ${getStatusColor(requirement)} hover:shadow-lg hover:scale-[1.02] transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-5 h-4 object-cover rounded shadow-sm flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{country.name}</h3>
              </div>
              {getStatusIcon(requirement)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{getStatusLabel(requirement)}</span>
              {requirement?.duration && (
                <span className="text-xs text-gray-500 dark:text-gray-500">{requirement.duration}</span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

