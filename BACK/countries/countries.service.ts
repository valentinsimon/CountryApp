import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
}

interface PopulationData {
    country: string;
    population: number;
}

interface CountryInfoResponse {
    borderCountries: BorderCountry[];
    populationData: PopulationData[];
    flagUrl: string;
}

@Injectable()
export class CountriesService {
    private dateNagerUrl: string = "https://date.nager.at/api/v3";
    private countriesNowUrl: string = "https://countriesnow.space/api/v0.1";

    constructor(private httpService: HttpService) {}

    async getAvailableCountries(): Promise<any> {
        return (await axios.get(`${this.dateNagerUrl}/AvailableCountries`)).data;
    }

    async getCountryInfo(countryCode: string): Promise<CountryInfoResponse> {
        const dateNagerInfo = (await axios.get(`${this.dateNagerUrl}/CountryInfo/${countryCode}`)).data;
        const borderCountries: BorderCountry[] = dateNagerInfo.borders.map((country: any) => {
            return { 
                commonName: country.commonName, 
                officialName: country.officialName, 
                countryCode: country.countryCode 
            };
        });
        const populationData: PopulationData[] = (await axios.get(`${this.countriesNowUrl}/countries/population`)).data.data.filter((country: any) => 
            country.country === dateNagerInfo.commonName || country.country === dateNagerInfo.officialName
        );
        const flagUrl: string = (await axios.get(`${this.countriesNowUrl}/countries/flag/images`)).data.data.filter((country: any) => 
            country.name === dateNagerInfo.commonName || country.name === dateNagerInfo.officialName
        )[0].flag;

        return { borderCountries, populationData, flagUrl };
    }
}

