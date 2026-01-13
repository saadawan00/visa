import { Country, VisaRequirement, VisaData, VisaStatistics, Region, VisaStatusFilter, ExistingVisas } from '../types';

export function calculateVisaStatistics(
  originCountry: Country | null,
  countries: Country[],
  visaData: VisaData,
  existingVisas: ExistingVisas
): VisaStatistics {
  if (!originCountry) {
    return { visaFree: 0, visaOnArrival: 0, evisa: 0, visaRequired: 0 };
  }

  const stats: VisaStatistics = {
    visaFree: 0,
    visaOnArrival: 0,
    evisa: 0,
    visaRequired: 0,
  };

  countries.forEach((destCountry) => {
    if (destCountry.code === originCountry.code) return;

    const key = `${originCountry.code}->${destCountry.code}`;
    let requirement = visaData.requirements[key];

    // Check if existing visas modify requirements
    if (requirement && existingVisas) {
      requirement = applyExistingVisas(requirement, originCountry.code, destCountry, existingVisas);
    }

    if (!requirement) {
      stats.visaRequired++;
      return;
    }

    if (!requirement.visaRequired) {
      stats.visaFree++;
    } else if (requirement.visaOnArrival) {
      stats.visaOnArrival++;
    } else if (isEVisa(requirement)) {
      stats.evisa++;
    } else {
      stats.visaRequired++;
    }
  });

  return stats;
}

function isEVisa(requirement: VisaRequirement): boolean {
  if (!requirement.visaRequired) return false;
  const cost = requirement.cost?.toLowerCase() || '';
  const notes = requirement.notes?.toLowerCase() || '';
  return cost.includes('e-visa') || cost.includes('evisa') || notes.includes('e-visa') || notes.includes('evisa') || notes.includes('online');
}

export function applyExistingVisas(
  requirement: VisaRequirement,
  originCountryCode: string,
  destCountry: Country,
  existingVisas: ExistingVisas
): VisaRequirement {
  // Handle Pakistani passport holders with US/UK/Schengen visas
  if (originCountryCode === 'PK') {
    // US visa benefits for Pakistani passport holders
    if (existingVisas.usVisa) {
      // Countries that become visa-free with US visa (multi-entry)
      const usVisaFreeCountries = ['AL', 'BA', 'BZ', 'CO', 'CR', 'DO', 'EC', 'GE', 'JM', 'XK', 'MX', 'ME', 'MK', 'PA', 'PE', 'PH', 'RS'];
      if (usVisaFreeCountries.includes(destCountry.code)) {
        return {
          ...requirement,
          visaRequired: false,
          visaOnArrival: false,
          duration: '30-90 days',
          notes: requirement.notes + ' Visa-free with valid US visa (multi-entry).',
        };
      }

      // Countries with simplified e-visa processing with US visa
      const usVisaEVisaCountries = ['AZ', 'BH', 'JO', 'KG', 'MA', 'OM', 'QA', 'SA', 'TW', 'TJ', 'TR'];
      if (usVisaEVisaCountries.includes(destCountry.code)) {
        return {
          ...requirement,
          visaRequired: true,
          visaOnArrival: false,
          notes: requirement.notes + ' Simplified e-visa processing available with valid US visa.',
        };
      }

      // Canada (green card holders)
      if (destCountry.code === 'CA') {
        return {
          ...requirement,
          visaRequired: false,
          visaOnArrival: false,
          duration: '6 months',
          notes: 'Pakistani citizens with US green card can visit Canada visa-free for up to 6 months.',
        };
      }
    }

    // UK visa benefits for Pakistani passport holders
    if (existingVisas.ukVisa) {
      // Countries that become visa-free with UK visa (multi-entry)
      const ukVisaFreeCountries = ['AL', 'BA', 'DO', 'GE', 'JM', 'XK', 'MX', 'ME', 'MK', 'PA', 'PE', 'PH', 'RS'];
      if (ukVisaFreeCountries.includes(destCountry.code)) {
        return {
          ...requirement,
          visaRequired: false,
          visaOnArrival: false,
          duration: '30-90 days',
          notes: requirement.notes + ' Visa-free with valid UK visa (multi-entry).',
        };
      }

      // Countries with simplified e-visa processing with UK visa
      const ukVisaEVisaCountries = ['AG', 'AZ', 'BH', 'KG', 'MA', 'OM', 'QA', 'SA', 'TW', 'TJ', 'TR'];
      if (ukVisaEVisaCountries.includes(destCountry.code)) {
        return {
          ...requirement,
          visaRequired: true,
          visaOnArrival: false,
          notes: requirement.notes + ' Simplified e-visa processing available with valid UK visa.',
        };
      }
    }

    // Schengen visa benefits for Pakistani passport holders
    if (existingVisas.schengenVisa) {
      // Schengen countries (visa-free with Schengen visa)
      const schengenCountries = ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL', 'GR', 'PT', 'CH', 'IS', 'LI', 'LU', 'MT', 'CZ', 'EE', 'HU', 'LV', 'LT', 'SK', 'SI'];
      if (schengenCountries.includes(destCountry.code)) {
        return {
          ...requirement,
          visaRequired: false,
          visaOnArrival: false,
          duration: '90 days within 180 days',
          notes: 'Pakistani citizens with valid Schengen visa can visit this country visa-free for up to 90 days within any 180-day period.',
        };
      }

      // Non-Schengen European countries accessible with Schengen visa
      const schengenAccessibleCountries = ['CO', 'CR', 'EC'];
      if (schengenAccessibleCountries.includes(destCountry.code)) {
        return {
          ...requirement,
          visaRequired: false,
          visaOnArrival: false,
          duration: '30-90 days',
          notes: requirement.notes + ' Visa-free with valid Schengen visa (multi-entry).',
        };
      }

      // Jordan offers simplified e-visa with Schengen visa
      if (destCountry.code === 'JO') {
        return {
          ...requirement,
          visaRequired: true,
          visaOnArrival: false,
          notes: requirement.notes + ' Simplified e-visa or visa-on-arrival processing available with valid Schengen visa.',
        };
      }
    }
  }

  // Generic US visa benefits (for all passport holders)
  if (existingVisas.usVisa) {
    if (['MX', 'CA'].includes(destCountry.code)) {
      return { ...requirement, visaRequired: false, visaOnArrival: false };
    }
  }

  // Generic Schengen visa benefits (for all passport holders)
  if (existingVisas.schengenVisa) {
    const schengenCountries = ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL', 'GR', 'PT', 'CH'];
    if (schengenCountries.includes(destCountry.code)) {
      return { ...requirement, visaRequired: false, visaOnArrival: false };
    }
  }

  return requirement;
}

export function getVisaStatus(requirement: VisaRequirement | null): VisaStatusFilter {
  if (!requirement) return 'visaRequired';

  if (!requirement.visaRequired) {
    return 'visaFree';
  } else if (requirement.visaOnArrival) {
    return 'visaOnArrival';
  } else if (isEVisa(requirement)) {
    return 'evisa';
  } else {
    return 'visaRequired';
  }
}

export function filterCountries(
  countries: Country[],
  originCountry: Country | null,
  visaData: VisaData,
  searchQuery: string,
  regionFilter: Region | 'all',
  statusFilter: VisaStatusFilter,
  existingVisas: ExistingVisas
): Country[] {
  return countries.filter((country) => {
    // Don't show origin country
    if (country.code === originCountry?.code) return false;

    // Filter by search query
    if (searchQuery && !country.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !country.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by region
    if (regionFilter !== 'all' && country.region !== regionFilter) {
      return false;
    }

    // Filter by visa status
    if (statusFilter !== 'all' && originCountry) {
      const key = `${originCountry.code}->${country.code}`;
      let requirement = visaData.requirements[key];
      
      if (requirement && existingVisas && originCountry) {
        requirement = applyExistingVisas(requirement, originCountry.code, country, existingVisas);
      }

      const status = getVisaStatus(requirement);
      if (status !== statusFilter) {
        return false;
      }
    }

    return true;
  });
}

