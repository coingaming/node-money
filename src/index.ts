import * as allConfig from '@heathmont/money-config';

function findConfig(currency) {
	const config = allConfig.find(x => x.code === currency);
	if (!config) {
		throw new Error(`Currency ${currency} not found`);
	}
	return config;
}

export function toDisplay(amount: number, currency: string) {
	const config = findConfig(currency);
	return amount * Math.pow(10, config.display.shift) / Math.pow(10, config.precision);
}
