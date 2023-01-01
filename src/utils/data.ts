import { SortOptionValues, QUERY_PARAM_DELIMITER } from '../const/const';
import { FilterData, Items } from '../types/data';

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

export const filterItemsBySelectList = (
  items: Items,
  filterString: string,
  filterType: 'category' | 'brand',
): Items => {
  if (filterString === '') return items;
  const activeNames = filterString.split(QUERY_PARAM_DELIMITER);
  return items.filter((item) => activeNames.some((it) => it === item[filterType].toLowerCase()));
};

export const getSelectListData = (
  items: Items,
  filteredItems: Items,
  allSelectListData: string[],
  filterString: string,
  filterType: 'category' | 'brand',
): FilterData => {
  const activeFilters = filterString.split(QUERY_PARAM_DELIMITER);

  return allSelectListData.map((name, idx) => ({
    id: `${name}_${idx}`,
    name,
    isActive: activeFilters.some((it) => it === name),
    allItems: items.filter((it) => name === it[filterType].toLowerCase()).length,
    availableItems: filteredItems.filter((it) => name === it[filterType].toLowerCase()).length,
  }));
};

export const getDualSliderMinIndex = (allSliderData: number[], queryString: string) => {
  const value = queryString.split(QUERY_PARAM_DELIMITER)[0];
  if (Number.isNaN(value)) return 0;
  return allSliderData.findIndex((it) => it >= +value);
};

export const getDualSliderMaxIndex = (allSliderData: number[], queryString: string) => {
  const value = +queryString.split(QUERY_PARAM_DELIMITER)[1];
  if (Number.isNaN(value)) return allSliderData.length > 0 ? allSliderData.length - 1 : 0;
  const dataValue = [...allSliderData].reverse().find((it) => it <= value);
  if (dataValue === undefined) return -1;
  return allSliderData.findIndex((it) => it === dataValue);
};

export const getDualSliderData = (allSliderData: number[], queryString: string, prefix = '') => {
  const minValue = getDualSliderMinIndex(allSliderData, queryString);
  const maxValue = getDualSliderMaxIndex(allSliderData, queryString);

  const minDataValue = allSliderData[minValue];
  const maxDataValue = allSliderData[maxValue];

  return {
    minValue,
    maxValue,
    minDataValue: `${prefix}${minDataValue}`,
    maxDataValue: `${prefix}${maxDataValue}`,
    max: allSliderData.length > 0 ? allSliderData.length - 1 : 0,
  };
};

export const filterItemsByPrice = (items: Items, allSliderData: number[], queryString: string) => {
  const minValue = getDualSliderMinIndex(allSliderData, queryString);
  const maxValue = getDualSliderMaxIndex(allSliderData, queryString);

  return items.filter(
    (it) => it.price >= allSliderData[minValue] && it.price <= allSliderData[maxValue],
  );
};

export const getPrices = (items: Items) =>
  [...new Set(items.map((it) => it.price))].sort((a, b) => a - b);

export const getStocks = (items: Items) =>
  [...new Set(items.map((it) => it.stock))].sort((a, b) => a - b);
