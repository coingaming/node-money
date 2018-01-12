import {
   baseToDisplay,
   baseToInput,
   baseToInteger,
   inputToInteger,
   integerToBase,
   integerToDisplay,
   integerToInput,
} from './index';

describe('money', () => {

   test('baseToDisplay', () => {
      expect(baseToDisplay(111111.222333443, 'BTC')).toBe(111111222.33344);
      expect(baseToDisplay(111111.223332, 'EUR')).toBe(111111.22333);
   });

   test('baseToInput', () => {
      expect(baseToInput(111111.222333443, 'BTC')).toBe(111111222.33344);
      expect(baseToInput(111111.223332, 'EUR')).toBe(111111.22333);
   });

   test('baseToInteger', () => {
      expect(baseToInteger(111111.222333443, 'BTC')).toBe(11111122233344);
      expect(baseToInteger(111111.223332, 'EUR')).toBe(11111122333);
   });

   test('inputToInteger', () => {
      expect(inputToInteger(111111222.333443, 'BTC')).toBe(11111122233344);
      expect(inputToInteger(111111.223332, 'EUR')).toBe(11111122333);
   });

   test('integerToBase', () => {
      expect(integerToBase(11111122233344.3, 'BTC')).toBe(111111.22233344);
      expect(integerToBase(11111122333.2, 'EUR')).toBe(111111.22333);
   });

   test('integerToDisplay', () => {
      expect(integerToDisplay(11111122233344.3, 'BTC')).toBe(111111222.33344);
      expect(integerToDisplay(11111122333.2, 'EUR')).toBe(111111.22333);
   });

   test('integerToInput', () => {
      expect(integerToInput(11111122233344.3, 'BTC')).toBe(111111222.33344);
      expect(integerToInput(11111122333.2, 'EUR')).toBe(111111.22333);
   });

});
