"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moneyConfig = require("@heathmont/money-config");
function findConfig(currency, unit) {
    var currencyConfig = moneyConfig[currency];
    if (!currencyConfig) {
        throw new Error("Currency " + currency + " not found");
    }
    var unitConfig = currencyConfig.units[unit];
    if (!unitConfig) {
        throw new Error("Currency unit " + currency + " " + unit + " not found");
    }
    return Object.assign(unitConfig, { precision: currencyConfig.precision });
}
exports.findConfig = findConfig;
function fromInteger(amount, currency, unit) {
    if (unit === void 0) { unit = null; }
    var config = findConfig(currency, unit || currency);
    var intAmount = +amount;
    if (intAmount % 1 !== 0) {
        throw new Error("Expected integer amount, got " + amount);
    }
    return intAmount / Math.pow(10, config.precision - config.shift);
}
exports.fromInteger = fromInteger;
function toInteger(amount, currency, unit) {
    if (unit === void 0) { unit = null; }
    var config = findConfig(currency, unit || currency);
    return Math.round(+amount * Math.pow(10, config.precision - config.shift));
}
exports.toInteger = toInteger;
function convertUnit(amount, currency, fromUnit, toUnit) {
    var fromConfig = findConfig(currency, fromUnit);
    var toConfig = findConfig(currency, toUnit);
    var roundPrecision = Math.pow(10, toConfig.precision - toConfig.shift);
    return Math.round(+amount * Math.pow(10, toConfig.shift - fromConfig.shift) * roundPrecision) / roundPrecision;
}
exports.convertUnit = convertUnit;
function getInputPrecision(currency) {
    var config = findConfig(currency, currency);
    return config.inputPrecision;
}
exports.getInputPrecision = getInputPrecision;
//# sourceMappingURL=index.js.map