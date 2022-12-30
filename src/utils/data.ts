import { SortOptionValues } from '../const/const';
import { FilterData, Items } from '../types/data';
import { FilterState } from '../types/state';

export const getSortedItems = (sortValue: SortOptionValues, items: Items) => {
  switch (sortValue) {
    case SortOptionValues.priceASC:
      return items.sort((a, b) => a.price - b.price);
    case SortOptionValues.priceDESC:
      return items.sort((a, b) => b.price - a.price);
    case SortOptionValues.raitingASC:
      return items.sort((a, b) => a.rating - b.rating);
    case SortOptionValues.raitingDESC:
      return items.sort((a, b) => b.rating - a.rating);
    default:
      return items;
  }
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

export const getCategories = (items: Items) => [
  ...new Set(items.map((item) => item.category.toLowerCase())),
];
export const getBrands = (items: Items) => [
  ...new Set(items.map((item) => item.brand.toLowerCase())),
];

export const getFilterState = (names: string[]) =>
  names.map((name, idx) => ({
    id: `${name}_${idx}`,
    name,
    isActive: false,
  }));

export const filterItems = (
  items: Items,
  filterState: FilterState,
  filterType: 'category' | 'brand',
) => {
  const filterValues = filterState.filter((it) => it.isActive).map((it) => it.name);
  if (filterValues.length === 0) return items;
  const filteredItems = items.filter((item) =>
    filterValues.some((it) => it === item[filterType].toLowerCase()),
  );
  return filteredItems;
};

export const getFilterData = (
  items: Items,
  filteredItems: Items,
  filterState: FilterState,
  filterType: 'category' | 'brand',
): FilterData =>
  filterState.map((item) => ({
    ...item,
    allItems: items.filter((it) => item.name === it[filterType].toLowerCase()).length,
    availableItems: filteredItems.filter((it) => item.name === it[filterType].toLowerCase()).length,
  }));

export const getPrices = (items: Items) =>
  [...new Set(items.map((it) => it.price))].sort((a, b) => a - b);

export const getStocks = (items: Items) =>
  [...new Set(items.map((it) => it.stock))].sort((a, b) => a - b);
