"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moneyConfig = require("@heathmont/money-config");
const lodash_1 = require("lodash");
const configByCode = lodash_1.keyBy(moneyConfig, 'code');
function findConfig(currency) {
    const config = configByCode[currency];
    if (!config) {
        throw new Error(`Currency ${currency} not found`);
    }
    return config;
}
function integerToBase(amount, currency) {
    const config = findConfig(currency);
    return Math.round(+amount) / Math.pow(10, config.precision);
}
exports.integerToBase = integerToBase;
function integerToDisplay(amount, currency) {
    const config = findConfig(currency);
    return Math.round(+amount) / Math.pow(10, config.precision - config.display.shift);
}
exports.integerToDisplay = integerToDisplay;
function integerToInput(amount, currency) {
    const config = findConfig(currency);
    return Math.round(+amount) / Math.pow(10, config.precision - config.display.shift);
}
exports.integerToInput = integerToInput;
function baseToDisplay(amount, currency) {
    return integerToDisplay(baseToInteger(amount, currency), currency);
}
exports.baseToDisplay = baseToDisplay;
function baseToInput(amount, currency) {
    return integerToInput(baseToInteger(amount, currency), currency);
}
exports.baseToInput = baseToInput;
function baseToInteger(amount, currency) {
    const config = findConfig(currency);
    return Math.round(+amount * Math.pow(10, config.precision));
}
exports.baseToInteger = baseToInteger;
function inputToInteger(amount, currency) {
    const config = findConfig(currency);
    return Math.round(+amount * Math.pow(10, config.precision - config.display.shift));
}
exports.inputToInteger = inputToInteger;
//# sourceMappingURL=index.js.map