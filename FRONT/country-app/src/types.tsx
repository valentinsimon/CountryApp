

export interface Country {
    countryCode: string;
    name: string;
    countryName?: string;
  }
  
  export interface PopulationCount {
    year: number;
    value: number;
  }
  
  export interface CountryInfo {
    countryName: string;
    flagUrl: string;
    borderCountries: {
      commonName: string;
      officialName: string;
      countryCode: string;
    }[];
    populationData: {
      country: string;
      code: string;
      iso3: string;
      populationCounts: PopulationCount[];
    }[];
  }
  