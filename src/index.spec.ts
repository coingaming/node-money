import {
   toInteger,
   fromInteger,
   convertUnit,
} from './index';

describe('money', () => {

   test('toInteger', () => {
      expect(() => toInteger(111111.222333443, 'ABC')).toThrow();
      expect(() => toInteger(111111.222333443, 'BTC', 'abc')).toThrow();
      expect(toInteger(111111.222333443, 'BTC')).toBe(11111122233344);
      expect(toInteger(111111222.333443, 'BTC', 'mBTC')).toBe(11111122233344);
      expect(toInteger(111111.223332, 'EUR')).toBe(11111122333);
      expect(toInteger(11111122.3332, 'EUR', 'cent')).toBe(11111122333);
   });

   test('fromInteger', () => {
      expect(() => fromInteger(11111122233344, 'ABC')).toThrow();
      expect(() => fromInteger(11111122233344, 'BTC', 'abc')).toThrow();
      expect(() => fromInteger(11111122233344.3, 'BTC')).toThrow();
      expect(fromInteger(11111122233344, 'BTC')).toBe(111111.22233344);
      expect(fromInteger(11111122233344, 'BTC', 'uBTC')).toBe(111111222333.44);
      expect(fromInteger(11111122333, 'EUR')).toBe(111111.22333);
      expect(fromInteger(11111122333, 'EUR', 'cent')).toBe(11111122.333);
   });

   test('convertUnit', () => {
      expect(() => convertUnit(11111122233344, 'ABC', 'abc', 'abc')).toThrow();
      expect(() => convertUnit(11111122233344, 'BTC', 'mBTC', 'abc')).toThrow();
      expect(() => convertUnit(11111122233344, 'BTC', 'abc', 'mBTC')).toThrow();
      expect(convertUnit(111111222.333443, 'BTC', 'mBTC', 'uBTC')).toBe(111111222333.44);
      expect(convertUnit(111111.223332, 'EUR', 'EUR', 'cent')).toBe(11111122);
   });

});
