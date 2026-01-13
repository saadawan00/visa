import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApplicationStep } from '../types';

const applicationSteps: ApplicationStep[] = [
  {
    id: 1,
    title: 'Determine Visa Type',
    description: 'Identify the correct visa type for your travel purpose',
    details: [
      'Tourist visa for leisure travel',
      'Business visa for work-related travel',
      'Transit visa for connecting flights',
      'Student visa for educational purposes',
    ],
  },
  {
    id: 2,
    title: 'Gather Required Documents',
    description: 'Collect all necessary documents for your application',
    details: [
      'Valid passport (usually valid for at least 6 months)',
      'Completed visa application form',
      'Passport-sized photographs',
      'Proof of travel arrangements (flight tickets, hotel bookings)',
      'Financial proof (bank statements, sponsorship letters)',
      'Travel insurance (if required)',
    ],
  },
  {
    id: 3,
    title: 'Submit Application',
    description: 'Submit your application through the appropriate channel',
    details: [
      'Online application through official government portal',
      'In-person submission at embassy or consulate',
      'Visa application center (VAC)',
      'Ensure all documents are properly organized',
    ],
  },
  {
    id: 4,
    title: 'Pay Fees',
    description: 'Complete payment for visa processing fees',
    details: [
      'Check accepted payment methods',
      'Pay online or at the application center',
      'Keep receipt for reference',
      'Fees are typically non-refundable',
    ],
  },
  {
    id: 5,
    title: 'Wait for Processing',
    description: 'Allow time for visa processing and review',
    details: [
      'Processing times vary by country and visa type',
      'Check application status online if available',
      'Be prepared for potential interview requests',
      'Do not make non-refundable travel arrangements until visa is approved',
    ],
  },
  {
    id: 6,
    title: 'Receive Visa',
    description: 'Collect your visa and verify all details',
    details: [
      'Pick up visa from embassy, consulate, or VAC',
      'Verify all information is correct (name, dates, visa type)',
      'Check validity period and entry conditions',
      'Keep a copy of your visa for records',
    ],
  },
];

export function ApplicationGuide() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
            Visa Application Guide
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Follow these steps to successfully apply for your visa
          </p>
        </motion.div>

        <div className="glass rounded-xl p-6 md:p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="hidden md:flex items-center justify-between mb-4">
              {applicationSteps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        currentStep >= step.id
                          ? 'bg-primary-600 dark:bg-primary-400 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">{step.id}</span>
                      )}
                    </button>
                    <span
                      className={`text-xs mt-2 text-center ${
                        currentStep >= step.id
                          ? 'text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      Step {step.id}
                    </span>
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-colors duration-200 ${
                        currentStep > step.id
                          ? 'bg-primary-600 dark:bg-primary-400'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Mobile Progress Indicator */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-6">
              {applicationSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentStep >= step.id
                      ? 'bg-primary-600 dark:bg-primary-400 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{step.id}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <AnimatePresence mode="wait">
            {applicationSteps
              .filter((step) => step.id === currentStep)
              .map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                      What you need to know:
                    </h4>
                    <ul className="space-y-3">
                      {step.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentStep(Math.min(applicationSteps.length, currentStep + 1))
                      }
                      disabled={currentStep === applicationSteps.length}
                      className="px-6 py-2 bg-primary-600 dark:bg-primary-400 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

