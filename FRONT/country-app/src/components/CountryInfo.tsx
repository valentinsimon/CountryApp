// src/components/CountryInfo.tsx
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PopulationChart from './PopulationChart';

interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
}

interface PopulationCount {
  year: number;
  value: number;
}

interface CountryInfo {
  borderCountries: BorderCountry[];
  populationData: {
    country: string;
    populationCounts: PopulationCount[];
  }[];
  flagUrl: string;
}

const CountryInfo = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  useEffect(() => {
    if (countryCode) {
      const fetchCountryInfo = async () => {
        try {
          const response = await axios.get<CountryInfo>(`http://localhost:3000/countries/${countryCode}`);
          setCountryInfo(response.data);
        } catch (error) {
          console.error('Error fetching country info', error);
        }
      };

      fetchCountryInfo();
    }
  }, [countryCode]);

  if (!countryInfo) return <div>Loading...</div>;
  return (
    <div>
      <h1>{countryInfo.borderCountries[0]?.commonName}</h1>
      <img src={countryInfo.flagUrl} alt={`${countryInfo.borderCountries[0]?.commonName} flag`} width="100" />
      
      <h2>Bordering Countries</h2>
      <ul>
        {countryInfo.borderCountries.map((borderCountry) => (
          <li key={borderCountry.countryCode}>
            <Link href={`/country/${borderCountry.countryCode}`}>
              {borderCountry.commonName}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Population Over Time</h2>
      {countryInfo.populationData.length > 0 && (
        <PopulationChart populationData={countryInfo.populationData[0].populationCounts} />
      )}
    </div>
  );
};

export default CountryInfo;