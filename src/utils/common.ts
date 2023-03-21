import { IImagesWithSize } from '../types/imageSlider';

export const getPriceWithoutDiscount = (price: number, discount: number): number =>
  Math.ceil((price * 100) / (100 - discount));

export const debounce = (fn: (value: string) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
};

export const getSearchParams = () =>
  Object.fromEntries(new URLSearchParams(window.location.search));

export const getLastNDigits = (val: number, n: number) => Number(String(val).slice(-n));

export const getNumberFirstNChars = (str: string, n: number) => Number(str.slice(0, n));

export const getImagesWithoutDuplicate = (imagesWithSize: IImagesWithSize[]) =>
  imagesWithSize.filter(
    (imageWithSize, i) => i === imagesWithSize.findIndex((val) => val.size === imageWithSize.size),
  );
