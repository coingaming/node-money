import * as moneyConfig from '@heathmont/money-config';

interface Config {
  precision: number;
  symbol: string;
  name: string;
  displayPrecision: number;
  inputPrecision: number;
  shift: number;
}

export function findConfig ( currency, unit ): Config {
  const currencyConfig = moneyConfig[ currency ];
  if (!currencyConfig) {
    throw new Error (`Currency ${currency} not found`);
  }
  const unitConfig = currencyConfig.units[ unit ];
  if (!unitConfig) {
    throw new Error (`Currency unit ${currency} ${unit} not found`);
  }
  return Object.assign (unitConfig, { precision: currencyConfig.precision });
}

export function fromInteger ( amount: number | string, currency: string, unit: string = null ) {
  const config = findConfig (currency, unit || currency);
  const intAmount = +amount;
  if (intAmount % 1 !== 0) {
    throw new Error (`Expected integer amount, got ${amount}`);
  }
  return intAmount / Math.pow (10, config.precision - config.shift);
}

export function toInteger ( amount: number | string, currency: string, unit: string = null, floor = false ) {
  const config = findConfig (currency, unit || currency);
  return floor ?
    Math.floor (+amount * Math.pow (10, config.precision - config.shift)) :
    Math.round (+amount * Math.pow (10, config.precision - config.shift));
}

export function convertUnit ( amount: number | string, currency: string, fromUnit: string, toUnit: string ) {
  const fromConfig = findConfig (currency, fromUnit);
  const toConfig = findConfig (currency, toUnit);
  const roundPrecision = Math.pow (10, toConfig.precision - toConfig.shift);
  return Math.round (+amount * Math.pow (10, toConfig.shift - fromConfig.shift) * roundPrecision) / roundPrecision;
}

export function getInputPrecision ( currency: string ) {
  const config = findConfig (currency, currency);
  return config.inputPrecision;
}
