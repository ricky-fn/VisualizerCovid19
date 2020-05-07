export interface TimeSeries {
    confirmed: number[],
    deaths: number[],
    recovered: number[],
    dates: string[],
    [key:string]: any
    // first: string
}

export interface CountryData {
    name: string,
    flag: string,
    altNames: string[],
    reports: number,
    cases: number,
    deaths: number,
    recovered: number,
    population: number,
    timeseries?: TimeSeries,
    [key:string]: any
}

export type CountriesData = {[key: string]: CountryData};