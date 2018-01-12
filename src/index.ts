import * as moneyConfig from '@heathmont/money-config';
import {keyBy} from 'lodash';

const configByCode = keyBy(moneyConfig, 'code');

function findConfig(currency) {
	const config = configByCode[currency];
	if (!config) {
		throw new Error(`Currency ${currency} not found`);
	}
	return config;
}

export function integerToBase(amount: number | string, currency: string) {
	const config = findConfig(currency);
	return Math.round(+amount) / Math.pow(10, config.precision);
}

export function integerToDisplay(amount: number | string, currency: string) {
	const config = findConfig(currency);
	return Math.round(+amount) / Math.pow(10, config.precision - config.display.shift);
}

export function integerToInput(amount: number | string, currency: string) {
	const config = findConfig(currency);
	return Math.round(+amount) / Math.pow(10, config.precision - config.display.shift);
}

export function baseToDisplay(amount: number | string, currency: string) {
	return integerToDisplay(baseToInteger(amount, currency), currency);
}

export function baseToInput(amount: number | string, currency: string) {
	return integerToInput(baseToInteger(amount, currency), currency);
}

export function baseToInteger(amount: number | string, currency: string) {
	const config = findConfig(currency);
	return Math.round(+amount * Math.pow(10, config.precision));
}

export function inputToInteger(amount: number | string, currency: string) {
	const config = findConfig(currency);
	return Math.round(+amount * Math.pow(10, config.precision - config.display.shift));
}