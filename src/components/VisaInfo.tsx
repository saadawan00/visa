import { useState } from 'react';
import { ChevronDown, FileText, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Country, VisaRequirement } from '../types';

interface VisaInfoProps {
  originCountry: Country;
  destinationCountry: Country;
  requirement: VisaRequirement;
}

export function VisaInfo({ originCountry, destinationCountry, requirement }: VisaInfoProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: FileText,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-300">
            Traveling from <strong>{originCountry.name}</strong> to{' '}
            <strong>{destinationCountry.name}</strong>
          </p>
          {requirement.notes && (
            <p className="text-gray-600 dark:text-gray-400">{requirement.notes}</p>
          )}
        </div>
      ),
    },
    {
      id: 'duration',
      title: 'Duration & Validity',
      icon: Calendar,
      content: requirement.duration ? (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Maximum Stay:</strong> {requirement.duration}
          </p>
          {requirement.visaOnArrival && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visa can be obtained upon arrival at the destination airport or border.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Duration information not available.</p>
      ),
    },
    {
      id: 'cost',
      title: 'Cost & Fees',
      icon: DollarSign,
      content: requirement.cost ? (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Visa Cost:</strong> {requirement.cost}
          </p>
          {requirement.visaOnArrival && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Payment is typically made at the port of entry.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Cost information not available.</p>
      ),
    },
    {
      id: 'processing',
      title: 'Processing Time',
      icon: CheckCircle,
      content: requirement.processingTime ? (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Processing Time:</strong> {requirement.processingTime}
          </p>
          {!requirement.visaOnArrival && requirement.visaRequired && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Apply well in advance of your travel date to ensure timely processing.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          {requirement.visaOnArrival
            ? 'No advance processing required - visa available on arrival.'
            : 'Processing time information not available.'}
        </p>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Detailed Visa Information
      </h3>

      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.has(section.id);

          return (
            <div
              key={section.id}
              className="glass-card border border-gray-200/50 dark:border-gray-700/30 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 bg-white/20 dark:bg-gray-800/20">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

