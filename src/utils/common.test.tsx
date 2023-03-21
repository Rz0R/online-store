import { IMAGES_WITH_SIZE, IMAGES_WITH_SIZE_WITHOUT_DUPLICATE } from '../mocks/data';
import {
  getImagesWithoutDuplicate,
  getLastNDigits,
  getNumberFirstNChars,
  getPriceWithoutDiscount,
} from './common';

describe('Checks common functions', () => {
  test('getPriceWithoutDiscount should return price without discount', () => {
    expect(getPriceWithoutDiscount(549, 12.96)).toEqual(631);
    expect(getPriceWithoutDiscount(47, 16)).toEqual(56);
    expect(getPriceWithoutDiscount(45, 17.75)).toEqual(55);
  });

  test('getLastNDigits should correctly return the last n digits', () => {
    expect(getLastNDigits(0, 2)).toEqual(0);
    expect(getLastNDigits(123, 2)).toEqual(23);
    expect(getLastNDigits(1234, 3)).toEqual(234);
  });

  test('getNumberFirstNChars should return NaN if the first n characters in the string contain letters', () => {
    expect(getNumberFirstNChars('string', 2)).toEqual(NaN);
    expect(getNumberFirstNChars('12s3tring', 4)).toEqual(NaN);
  });

  test('getNumberFirstNChars should return correctly number', () => {
    expect(getNumberFirstNChars('123', 0)).toEqual(0);
    expect(getNumberFirstNChars('123', 2)).toEqual(12);
    expect(getNumberFirstNChars('123', 4)).toEqual(123);
  });

  test('getImagesWithoutDuplicate return unique values', () => {
    expect(getImagesWithoutDuplicate(IMAGES_WITH_SIZE)).toEqual(IMAGES_WITH_SIZE_WITHOUT_DUPLICATE);
  });
});
