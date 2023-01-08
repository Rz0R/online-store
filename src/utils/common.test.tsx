import { getPriceWithoutDiscount } from './common';

describe('Checks common functions', () => {
  test('getPriceWithoutDiscount should return price without discount', () => {
    expect(getPriceWithoutDiscount(549, 12.96)).toEqual(631);
    expect(getPriceWithoutDiscount(47, 16)).toEqual(56);
    expect(getPriceWithoutDiscount(45, 17.75)).toEqual(55);
  });
});
