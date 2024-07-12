import Decimal from 'decimal.js';

export function d(value: Decimal.Value): Decimal {
  return new Decimal(value);
}
