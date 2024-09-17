import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HomePage = () => {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const response = await axios.get(`${apiBaseUrl}/countries/available`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <PageContainer>
      <Title>CountryApp</Title>
      <ButtonGrid>
        {countries.map((country) => (
          <CountryButton key={country.countryCode} href={`/country/${country.countryCode}`}>
            {country.name}
          </CountryButton>
        ))}
      </ButtonGrid>
    </PageContainer>
  );
};

export default HomePage;

// Styled Components
const PageContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
`;

const CountryButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border: 3px ridge #149cea;
  border-radius: 0.3em;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #149cea;
    color: black;
    box-shadow: inset 0px 0px 25px #1479ea;
  }
`;
