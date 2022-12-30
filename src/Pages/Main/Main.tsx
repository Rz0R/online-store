import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import Filters from '../../Components/Filters';
import ProductList from '../../Components/ProductList';
import TopPanel from '../../Components/TopPanel';
import { CardView, SortOptionValues } from '../../const/const';
import {
  getSortedItems,
  findItems,
  filterItems,
  getFilterState,
  getFilterData,
} from '../../utils/data';
import { FilterState } from '../../types/state';
import styles from './Main.module.scss';
import { Items } from '../../types/data';

enum QueryParams {
  view = 'view',
  sort = 'sort',
  search = 'search',
}

function Main() {
  const dispatch = useAppDispatch();
  const { items, categories, brands, prices, stocks, isLoading } = useAppSelector(
    (state) => state.ITEMS,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const cardView = (searchParams.get(QueryParams.view) as CardView) || CardView.simple;
  const sortValue =
    (searchParams.get(QueryParams.sort) as SortOptionValues) || SortOptionValues.sortTitle;
  const searchValue = searchParams.get(QueryParams.search) || '';

  const [categoryFilterState, setCategoryFilterState] = useState<FilterState>([]);
  const [bradnFilterState, setBrandFilterState] = useState<FilterState>([]);
  const [priceFilterState, setPriceFilterState] = useState<{
    minValue: number;
    maxValue: number;
    minDataValue: string;
    maxDataValue: string;
    max: number;
  }>({
    minValue: 0,
    maxValue: 0,
    minDataValue: '€0',
    maxDataValue: '€0',
    max: 0,
  });

  const [stockFilterState, setStockFilterState] = useState<{
    minValue: number;
    maxValue: number;
    minDataValue: string;
    maxDataValue: string;
    max: number;
  }>({
    minValue: 0,
    maxValue: 0,
    minDataValue: '0',
    maxDataValue: '0',
    max: 0,
  });

  const [filteredItems, setFilteredItems] = useState<Items>([]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loadItemsAction());
    } else {
      setCategoryFilterState(getFilterState(categories));
      setBrandFilterState(getFilterState(brands));
      setPriceFilterState({
        minValue: 0,
        maxValue: prices.length - 1 || 0,
        minDataValue: `€${prices[0]}`,
        maxDataValue: `€${prices[prices.length - 1]}`,
        max: prices.length > 0 ? prices.length - 1 : 0,
      });
      setStockFilterState({
        minValue: 0,
        maxValue: stocks.length - 1 || 0,
        minDataValue: `${stocks[0]}`,
        maxDataValue: `${stocks[stocks.length - 1]}`,
        max: stocks.length > 0 ? stocks.length - 1 : 0,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    const itemsFiteredByCategories: Items = filterItems(items, categoryFilterState, 'category');

    const itemsFilteredByBrands: Items = filterItems(
      itemsFiteredByCategories,
      bradnFilterState,
      'brand',
    );

    const itemsFiteredByPrice = itemsFilteredByBrands.filter(
      (it) =>
        it.price >= prices[priceFilterState.minValue] &&
        it.price <= prices[priceFilterState.maxValue],
    );

    const itemsFiteredByStock = itemsFiteredByPrice.filter(
      (it) =>
        it.stock >= stocks[stockFilterState.minValue] &&
        it.stock <= stocks[stockFilterState.maxValue],
    );

    const foundItems = findItems(itemsFiteredByStock, searchValue);

    setFilteredItems(foundItems);
  }, [
    searchValue,
    JSON.stringify(categoryFilterState),
    JSON.stringify(bradnFilterState),
    JSON.stringify(priceFilterState),
    JSON.stringify(stockFilterState),
  ]);

  const onCategoryFilterChange = (id: string) => {
    setCategoryFilterState((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isActive: !it.isActive } : it)),
    );
  };

  const onBrandFilterChange = (id: string) => {
    setBrandFilterState((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isActive: !it.isActive } : it)),
    );
  };

  const onViewSwitchChange = (viewMode: CardView) =>
    setSearchParams((urlParams) => {
      const prev = Object.fromEntries(urlParams.entries());
      return {
        ...prev,
        [QueryParams.view]: viewMode,
      };
    });

  const onSortValueChange = (value: SortOptionValues) =>
    setSearchParams((urlParams) => {
      const prev = Object.fromEntries(urlParams.entries());
      return {
        ...prev,
        [QueryParams.sort]: value,
      };
    });

  const onSearchValueChange = (value: string) =>
    setSearchParams((urlParams) => {
      const prev = Object.fromEntries(urlParams.entries());
      if (value === '') {
        delete prev[QueryParams.search];
        return {
          ...prev,
        };
      }
      return {
        ...prev,
        [QueryParams.search]: value,
      };
    });

  const onPriceFilterChange = (minValue: number, maxValue: number) => {
    setPriceFilterState((prev) => ({
      ...prev,
      minValue,
      maxValue,
      minDataValue: `€${prices[minValue]}`,
      maxDataValue: `€${prices[maxValue]}`,
    }));
  };

  const onStockFilterChange = (minValue: number, maxValue: number) => {
    setStockFilterState((prev) => ({
      ...prev,
      minValue,
      maxValue,
      minDataValue: `${stocks[minValue]}`,
      maxDataValue: `${stocks[maxValue]}`,
    }));
  };

  const categoryFilterData = getFilterData(items, filteredItems, categoryFilterState, 'category');

  const brandFilterData = getFilterData(items, filteredItems, bradnFilterState, 'brand');

  const sortedItems = getSortedItems(sortValue, [...filteredItems]);

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        {!isLoading && (
          <>
            <Filters
              priceState={{ ...priceFilterState, onInput: onPriceFilterChange }}
              stockState={{ ...stockFilterState, onInput: onStockFilterChange }}
              categoryState={categoryFilterData}
              onCategoryFilterChange={onCategoryFilterChange}
              brandState={brandFilterData}
              onBrategoryFilterChange={onBrandFilterChange}
            />
            <div className={styles.main__rightPanel}>
              <TopPanel
                cardView={cardView}
                onViewSwitchChange={onViewSwitchChange}
                sortValue={sortValue}
                onSortValueChange={onSortValueChange}
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
              />
              <ProductList items={sortedItems} cardView={cardView} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Main;
