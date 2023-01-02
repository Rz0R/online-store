import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import Filters from '../../Components/Filters';
import ProductList from '../../Components/ProductList';
import TopPanel from '../../Components/TopPanel';
import { CardView, QUERY_PARAM_DELIMITER, SortOptionValues } from '../../const/const';
import {
  getSortedItems,
  findItems,
  filterItemsBySelectList,
  getSelectListData,
  getDualSliderData,
  filterItemsByDualSlider,
} from '../../utils/data';
import { Items } from '../../types/data';
import styles from './Main.module.scss';

enum QueryParams {
  view = 'view',
  sort = 'sort',
  search = 'search',
  category = 'category',
  brand = 'brand',
  price = 'price',
  stock = 'stock',
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
  const categoryValues = searchParams.get(QueryParams.category) || '';
  const brandValues = searchParams.get(QueryParams.brand) || '';
  const priceValues = searchParams.get(QueryParams.price) || '';
  const stockValues = searchParams.get(QueryParams.stock) || '';

  const [filteredItems, setFilteredItems] = useState<Items>([]);

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

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

    const foundItems = findItems(itemsFiteredByStock, searchValue);

    setFilteredItems(foundItems);
  }, [isLoading, searchValue, categoryValues, brandValues, priceValues, stockValues]);

  const onSelectFilterChange = (
    filter: string,
    isActive: boolean,
    filterType: 'category' | 'brand',
  ) => {
    setSearchParams((urlParams) => {
      const prev = Object.fromEntries(urlParams.entries());
      const prevQueryValue =
        urlParams.get(QueryParams[filterType])?.split(QUERY_PARAM_DELIMITER) || [];

      const currentQueryValue = isActive
        ? [...new Set([...prevQueryValue, filter])]
        : prevQueryValue.filter((it) => it !== filter);

      if (currentQueryValue.length > 0) {
        return {
          ...prev,
          [QueryParams[filterType]]: currentQueryValue.join(QUERY_PARAM_DELIMITER),
        };
      }

      delete prev[QueryParams[filterType]];
      return prev;
    });
  };

  const onCategoryFilterChange = (category: string, isActive: boolean) => {
    onSelectFilterChange(category, isActive, 'category');
  };

  const onBrandFilterChange = (brand: string, isActive: boolean) => {
    onSelectFilterChange(brand, isActive, 'brand');
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
        return prev;
      }
      return {
        ...prev,
        [QueryParams.search]: value,
      };
    });

  const onDualSliderChange = (
    minValue: number,
    maxValue: number,
    sliderType: 'price' | 'stock',
  ) => {
    const dataVaues = sliderType === 'price' ? prices : stocks;
    const minDataValue = dataVaues[minValue];
    const maxDataValue = dataVaues[maxValue];
    setSearchParams((urlParams) => {
      const prev = Object.fromEntries(urlParams.entries());

      return {
        ...prev,
        [QueryParams[sliderType]]: `${minDataValue}${QUERY_PARAM_DELIMITER}${maxDataValue}`,
      };
    });
  };

  const onPriceDualSliderChange = (minValue: number, maxValue: number) =>
    onDualSliderChange(minValue, maxValue, 'price');

  const onStockDualSliderChange = (minValue: number, maxValue: number) =>
    onDualSliderChange(minValue, maxValue, 'stock');

  const categoryFilterData = getSelectListData(
    items,
    filteredItems,
    categories,
    categoryValues,
    'category',
  );

  const brandFilterData = getSelectListData(items, filteredItems, brands, brandValues, 'brand');

  const priceDualSliderData = getDualSliderData(prices, priceValues);

  const stockDualSliderData = getDualSliderData(stocks, stockValues);

  const sortedItems = getSortedItems(sortValue, [...filteredItems]);

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        {!isLoading && (
          <>
            <Filters
              priceState={{ ...priceDualSliderData, onInput: onPriceDualSliderChange }}
              stockState={{ ...stockDualSliderData, onInput: onStockDualSliderChange }}
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
