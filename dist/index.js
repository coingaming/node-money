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
function toFloat(amount, currency) {
    const config = findConfig(currency);
    return +amount * Math.pow(10, config.display.shift) / Math.pow(10, config.precision);
}
exports.toFloat = toFloat;
function toInteger(amount, currency) {
    const config = findConfig(currency);
    return +amount * Math.pow(10, config.precision) / Math.pow(10, config.display.shift);
}
exports.toInteger = toInteger;
console.log(toInteger(111111222.33344, "BTCr"));
//# sourceMappingURL=index.js.map