import { getCategories, getBrands, getPrices, getStocks } from './data';
import { ITEMS, CATEGORIES, BRANDS, PRICES, STOCKS } from '../mocks/data';

describe('Checks data transformation functions', () => {
  test('getCategories should return unique categories', () => {
    expect(getCategories(ITEMS)).toEqual(CATEGORIES);
  });

  test('getBrands should return unique brands', () => {
    expect(getBrands(ITEMS)).toEqual(BRANDS);
  });

  test('getPrices should return unique prices', () => {
    expect(getPrices(ITEMS)).toEqual(PRICES);
  });

  test('getStocks should return unique stocks', () => {
    expect(getStocks(ITEMS)).toEqual(STOCKS);
  });
});
