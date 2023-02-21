export interface CountryData {
    name: string,
    flag: string,
    altNames: string[],
    reports: number,
    cases: number,
    deaths: number,
    recovered: number,
    population: number,
    [key:string]: any
}

export interface Worldwide {
    deaths: number
    recovered: number
    reports: number
}

export type CountriesSortedByActive = string[];

export type CountriesData = {[key: string]: CountryData};

export interface MapData {
    worldwide: Worldwide,
    countries: CountriesData,
    countriesSortedByActive: CountriesSortedByActive,
    timestamp: string,
    max: string
}

export interface DateDiffer {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
}
