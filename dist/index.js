"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allConfig = require("@heathmont/money-config");
function findConfig(currency) {
    const config = allConfig.find(x => x.code === currency);
    if (!config) {
        throw new Error(`Currency ${currency} not found`);
    }
    return config;
}
function toDisplay(amount, currency) {
    const config = findConfig(currency);
    return amount * Math.pow(10, config.display.shift) / Math.pow(10, config.precision);
}
exports.toDisplay = toDisplay;
console.log(findConfig('EUR'));
console.log(toDisplay(1111122233344, "BTC"));
//# sourceMappingURL=index.js.map