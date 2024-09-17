import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CountryInfo } from '../../types';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Container = styled.div`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 30px; /* Ajuste para aumentar la distancia entre el título y los botones */
  font-size: 1.5em;
  font-weight: bold;
`;

const FlagImage = styled.img`
  width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BorderButton = styled.a`
  display: block;
  width: 10em;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  background-color: #00aaff;
  color: #fff;
  border-radius: 0.3em;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0088cc;
    transform: scale(1.05);
  }
`;

const BackButton = styled.a`
  display: inline-block;
  padding: 0.5em 1em;
  margin-bottom: 20px;
  color: #fff;
  background-color: #00aaff;
  text-decoration: none;
  border-radius: 0.3em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0088cc;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
`;

const CountryInfoPage = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [country, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (typeof countryCode === 'string') {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
          const res = await axios.get<CountryInfo>(`${apiBaseUrl}/countries/${countryCode}`);
          setCountryInfo(res.data);
        } catch (err) {
          console.error('Error fetching country info:', err);
          setError('Error fetching country information');
        }
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: countryInfo.populationData[0]?.populationCounts.map(count => count.year) || [],
    datasets: [
      {
        label: 'Population Over Time',
        data: countryInfo.populationData[0]?.populationCounts.map(count => count.value) || [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container>
      <BackButton href="/">Back</BackButton>
      <Title>{countryCode}</Title>
      <FlagImage src={countryInfo.flagUrl} alt={`${countryInfo.countryName} Flag`} />
      <Subtitle>Border Countries</Subtitle>
      <ButtonContainer>
        {countryInfo.borderCountries.map((border) => (
          <BorderButton key={border.countryCode} href={`/country/${border.countryCode}`}>
            {border.commonName}
          </BorderButton>
        ))}
      </ButtonContainer>
      <Subtitle>Population Over Time</Subtitle>
      <div style={{ marginTop: '20px' }}>
        <Line data={chartData} />
      </div>
    </Container>
  );
};

export default CountryInfoPage;
