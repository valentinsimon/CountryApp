import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}

    @Get('available')
    getAvailableCountries(): Promise<string[]> {
        return this.countriesService.getAvailableCountries();
    }

    @Get(':countryCode')
    getCountryInfo(@Param('countryCode') countryCode: string): Promise<any> {
        return this.countriesService.getCountryInfo(countryCode);
    }
}