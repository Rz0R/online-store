import { SortOptionValues, QUERY_PARAM_DELIMITER } from '../const/const';
import { FilterData, Item, Items } from '../types/data';

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

export const getDualSliderData = (allSliderData: number[], queryString: string) => {
  const minValue = getDualSliderMinIndex(allSliderData, queryString);
  const maxValue = getDualSliderMaxIndex(allSliderData, queryString);

  const minDataValue = allSliderData[minValue];
  const maxDataValue = allSliderData[maxValue];

  return {
    minValue,
    maxValue,
    minDataValue,
    maxDataValue,
    max: allSliderData.length > 0 ? allSliderData.length - 1 : 0,
  };
};

export const getDualSliderDataAterFiltering = (
  allSliderData: number[],
  fiteredItems: Items,
  filterType: 'price' | 'stock',
) => {
  if (fiteredItems.length === 0) {
    return {
      minValue: 0,
      maxValue: allSliderData.length - 1,
      minDataValue: NaN,
      maxDataValue: NaN,
      max: allSliderData.length - 1,
    };
  }

  const sortedItems = [...fiteredItems].sort(
    (a: Item, b: Item) => (a[filterType] as number) - (b[filterType] as number),
  );

  const minValue = allSliderData.findIndex((it) => it === sortedItems[0][filterType]);
  const maxValue = allSliderData.findIndex(
    (it) => it === sortedItems[sortedItems.length - 1][filterType],
  );

  const minDataValue = allSliderData[minValue];
  const maxDataValue = allSliderData[maxValue];

  return {
    minValue,
    maxValue,
    minDataValue,
    maxDataValue,
    max: allSliderData.length > 0 ? allSliderData.length - 1 : 0,
  };
};

export const filterItemsByDualSlider = (
  items: Items,
  allSliderData: number[],
  queryString: string,
  sliderType: 'price' | 'stock',
) => {
  const minValue = getDualSliderMinIndex(allSliderData, queryString);
  const maxValue = getDualSliderMaxIndex(allSliderData, queryString);

  return items.filter(
    (it) => it[sliderType] >= allSliderData[minValue] && it[sliderType] <= allSliderData[maxValue],
  );
};

export const filterItems = ({
  items,
  categoryValues,
  brandValues,
  prices,
  priceValues,
  stocks,
  stockValues,
  searchValue,
}: {
  items: Items;
  categoryValues: string;
  brandValues: string;
  prices: number[];
  priceValues: string;
  stocks: number[];
  stockValues: string;
  searchValue: string;
}) => {
  const itemsFiteredByCategories: Items = filterItemsBySelectList(
    items,
    categoryValues,
    'category',
  );

  const itemsFilteredByBrands: Items = filterItemsBySelectList(
    itemsFiteredByCategories,
    brandValues,
    'brand',
  );

  const itemsFiteredByPrice = filterItemsByDualSlider(
    itemsFilteredByBrands,
    prices,
    priceValues,
    'price',
  );

  const itemsFiteredByStock = filterItemsByDualSlider(
    itemsFiteredByPrice,
    stocks,
    stockValues,
    'stock',
  );

  return findItems(itemsFiteredByStock, searchValue);
};
