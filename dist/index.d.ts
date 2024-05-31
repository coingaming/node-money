interface Config {
    precision: number;
    symbol: string;
    name: string;
    displayPrecision: number;
    inputPrecision: number;
    shift: number;
}
export declare function findConfig(currency: any, unit: any): Config;
export declare function fromInteger(amount: number | string, currency: string, unit?: string): number;
export declare function toInteger(amount: number | string, currency: string, unit?: string, floor?: boolean): number;
export declare function convertUnit(amount: number | string, currency: string, fromUnit: string, toUnit: string): number;
export declare function getInputPrecision(currency: string): number;
export {};
