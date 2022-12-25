import { SortOptionValues } from '../const/const';
import { Items } from '../types/data';

export const getSortedItems = {
  [SortOptionValues.sortTitle]: (items: Items) => items,
  [SortOptionValues.priceASC]: (items: Items) => items.sort((a, b) => a.price - b.price),
  [SortOptionValues.priceDESC]: (items: Items) => items.sort((a, b) => b.price - a.price),
  [SortOptionValues.raitingASC]: (items: Items) => items.sort((a, b) => a.rating - b.rating),
  [SortOptionValues.raitingDESC]: (items: Items) => items.sort((a, b) => b.rating - a.rating),
};

export const findItems = (items: Items, searchValue: string) => {
  if (searchValue === '') return items;

  return items.filter(
    (item) =>
      item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.price.toString() === searchValue ||
      item.stock.toString() === searchValue ||
      item.discountPercentage.toString() === searchValue,
  );
};

export const getCategories = (items: Items) => [...new Set(items.map((item) => item.category))];
export const getBrands = (items: Items) => [...new Set(items.map((item) => item.brand))];
