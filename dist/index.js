"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moneyConfig = require("@heathmont/money-config");
function findConfig(currency, unit) {
    const currencyConfig = moneyConfig[currency];
    if (!currencyConfig) {
        throw new Error(`Currency ${currency} not found`);
    }
    const unitConfig = currencyConfig.units[unit];
    if (!unitConfig) {
        throw new Error(`Currency unit ${currency} ${unit} not found`);
    }
    return Object.assign(unitConfig, { precision: currencyConfig.precision });
}
function fromInteger(amount, currency, unit = null) {
    const config = findConfig(currency, unit || currency);
    const intAmount = +amount;
    if (intAmount % 1 !== 0) {
        throw new Error(`Expected integer amount, got ${amount}`);
    }
    return intAmount / Math.pow(10, config.precision - config.shift);
}
exports.fromInteger = fromInteger;
function toInteger(amount, currency, unit = null) {
    const config = findConfig(currency, unit || currency);
    return Math.round(+amount * Math.pow(10, config.precision - config.shift));
}
exports.toInteger = toInteger;
function convertUnit(amount, currency, fromUnit, toUnit) {
    const fromConfig = findConfig(currency, fromUnit);
    const toConfig = findConfig(currency, toUnit);
    const roundPrecision = Math.pow(10, toConfig.precision - toConfig.shift);
    return Math.round(+amount * Math.pow(10, toConfig.shift - fromConfig.shift) * roundPrecision) / roundPrecision;
}
exports.convertUnit = convertUnit;
//# sourceMappingURL=index.js.map