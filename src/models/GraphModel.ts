export interface IResult {
    entityId: number;
    categoryId: number;
    kco2e: number;
}

export interface IOrganisation {
    id: number;
    name: string;
    numberOfEmployees: number;
    turnover: number;
}

export interface ICategory {
    id: number;
    name: string;
    categoryId: number | null;
    scope?: string;
}

export interface IDataState {
    results: IResult[];
    organisations: IOrganisation[];
    categories: ICategory[];
}

export interface ITempAggregatedData {
    [organisation: string]: {
        organisation: string;
        kco2e: number;
    };
}

export interface IAggregatedData {
    series: number[];
    legend: string[];
}
