export type Region = 'Asia' | 'Middle East' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';

export interface Country {
  code: string;
  name: string;
  flag?: string;
  region?: Region;
}

export interface VisaRequirement {
  visaRequired: boolean;
  visaOnArrival: boolean;
  duration?: string;
  processingTime?: string;
  cost?: string;
  notes?: string;
  requirements?: string[];
}

export interface VisaData {
  countries: Record<string, Country>;
  requirements: Record<string, VisaRequirement>;
}

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  details: string[];
}

export interface ExistingVisas {
  usVisa: boolean;
  ukVisa: boolean;
  schengenVisa: boolean;
  uaeResidency: boolean;
}

export type VisaStatusFilter = 'all' | 'visaFree' | 'visaOnArrival' | 'evisa' | 'visaRequired';

export interface VisaStatistics {
  visaFree: number;
  visaOnArrival: number;
  evisa: number;
  visaRequired: number;
}

