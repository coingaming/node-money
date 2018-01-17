## Usage
```bash
npm install --save "@heathmont/money-config"
```

```typescript
import { toInteger, fromInteger, convertUnit } from "@heathmont/money-config";
```

### toInteger(amount, currency, [unit])
```typescript
toInteger(111111.222333443, 'BTC')
11111122233344

toInteger(111111222.333443, 'BTC', 'mBTC')
11111122233344

toInteger(111111.223332, 'EUR')
11111122333

toInteger(11111122.3332, 'EUR', 'cent')
11111122333
```

### fromInteger(amount, currency, [unit])
```typescript
fromInteger(11111122233344, 'BTC')
111111.22233344

fromInteger(11111122233344, 'BTC', 'uBTC')
111111222333.44

fromInteger(11111122333, 'EUR')
111111.22333

fromInteger(11111122333, 'EUR', 'cent')
11111122.333
```

### convertUnit(amount, currency, fromUnit, toUnit)
```typescript
convertUnit(111111222.333443, 'BTC', 'mBTC', 'uBTC')
111111222333.44

convertUnit(111111.223332, 'EUR', 'EUR', 'cent')
11111122.333
```