import { CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { VisaStatistics } from '../types';

interface VisaSummaryCardsProps {
  statistics: VisaStatistics;
}

export function VisaSummaryCards({ statistics }: VisaSummaryCardsProps) {
  const cards = [
    {
      id: 'visaFree',
      label: 'Visa Free',
      count: statistics.visaFree,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'visaOnArrival',
      label: 'Visa on Arrival',
      count: statistics.visaOnArrival,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      id: 'evisa',
      label: 'E-Visa',
      count: statistics.evisa,
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'visaRequired',
      label: 'Visa Required',
      count: statistics.visaRequired,
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`glass-card ${card.borderColor}/50 border rounded-xl p-4 text-center`}
          >
            <Icon className={`w-8 h-8 md:w-10 md:h-10 ${card.iconColor} mx-auto mb-2`} />
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {card.count}
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
              {card.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

