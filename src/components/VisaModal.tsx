import { useEffect } from 'react';
import { X, CheckCircle, XCircle, Clock, DollarSign, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Country, VisaRequirement } from '../types';
import { VisaInfo } from './VisaInfo';

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  originCountry: Country | null;
  destinationCountry: Country | null;
  requirement: VisaRequirement | null;
}

export function VisaModal({
  isOpen,
  onClose,
  originCountry,
  destinationCountry,
  requirement,
}: VisaModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getStatusIcon = () => {
    if (!requirement) return null;

    if (!requirement.visaRequired) {
      return <CheckCircle className="w-16 h-16 text-green-500" />;
    } else if (requirement.visaOnArrival) {
      return <Clock className="w-16 h-16 text-yellow-500" />;
    } else {
      return <XCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getStatusText = () => {
    if (!requirement) return 'Information Not Available';

    if (!requirement.visaRequired) {
      return 'Visa Not Required';
    } else if (requirement.visaOnArrival) {
      return 'Visa on Arrival Available';
    } else {
      return 'Visa Required';
    }
  };

  const getStatusColor = () => {
    if (!requirement) {
      return 'border-yellow-200/50 dark:border-yellow-500/20 bg-yellow-50/30 dark:bg-yellow-900/10';
    }

    if (!requirement.visaRequired) {
      return 'border-green-200/50 dark:border-green-500/20 bg-green-50/30 dark:bg-green-900/10';
    } else if (requirement.visaOnArrival) {
      return 'border-yellow-200/50 dark:border-yellow-500/20 bg-yellow-50/30 dark:bg-yellow-900/10';
    } else {
      return 'border-red-200/50 dark:border-red-500/20 bg-red-50/30 dark:bg-red-900/10';
    }
  };

  if (!originCountry || !destinationCountry) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative glass-strong rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full glass-card text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {requirement === null ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-xl p-8 border border-yellow-200/50 dark:border-yellow-500/20 bg-yellow-50/30 dark:bg-yellow-900/10"
                  >
                    <div className="text-center">
                      <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Information Not Available</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        We don't have visa requirement data for this country combination yet. Please check with the official embassy or consulate for the most up-to-date information.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Visa Status Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`glass rounded-xl p-6 md:p-8 border ${getStatusColor()} mb-6`}
                    >
                      {/* Country Flags and Names */}
                      <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-gray-200/50 dark:border-gray-700/30">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/w40/${originCountry.code.toLowerCase()}.png`}
                            alt={originCountry.name}
                            className="w-8 h-6 object-cover rounded shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {originCountry.name}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/w40/${destinationCountry.code.toLowerCase()}.png`}
                            alt={destinationCountry.name}
                            className="w-8 h-6 object-cover rounded shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {destinationCountry.name}
                          </span>
                        </div>
                      </div>

                      <div className="text-center mb-6">
                        {getStatusIcon()}
                        <h3 className="text-2xl font-bold mt-4 mb-2">{getStatusText()}</h3>
                        {requirement.notes && (
                          <p className="text-gray-600 dark:text-gray-400">{requirement.notes}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {requirement.duration && (
                          <div className="glass-card rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              <span className="font-semibold text-gray-700 dark:text-gray-300">Duration</span>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100">{requirement.duration}</p>
                          </div>
                        )}

                        {requirement.processingTime && (
                          <div className="glass-card rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Processing Time
                              </span>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100">{requirement.processingTime}</p>
                          </div>
                        )}

                        {requirement.cost && (
                          <div className="glass-card rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              <span className="font-semibold text-gray-700 dark:text-gray-300">Cost</span>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100">{requirement.cost}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Detailed Visa Information */}
                    <VisaInfo
                      originCountry={originCountry}
                      destinationCountry={destinationCountry}
                      requirement={requirement}
                    />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
