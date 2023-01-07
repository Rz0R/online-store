import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import Filters from '../../Components/Filters';
import ProductList from '../../Components/ProductList';
import TopPanel from '../../Components/TopPanel';
import { CardView, QUERY_PARAM_DELIMITER, SortOptionValues, QueryParams } from '../../const/const';
import {
  getSortedItems,
  filterItems,
  getSelectListData,
  getDualSliderData,
  getDualSliderDataAfterFiltering,
} from '../../utils/filter';
import { Items, StateDualSliderData } from '../../types/data';
import styles from './Main.module.scss';

function Main() {
  const dispatch = useAppDispatch();
  const { items, categories, brands, prices, stocks, isLoading } = useAppSelector(
    (state) => state.ITEMS,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const cardView = (searchParams.get(QueryParams.view) as CardView) || CardView.simple;
  const sortValue =
    (searchParams.get(QueryParams.sort) as SortOptionValues) || SortOptionValues.sortTitle;
  const searchValue = searchParams.get(QueryParams.search) || '';
  const categoryValues = searchParams.get(QueryParams.category) || '';
  const brandValues = searchParams.get(QueryParams.brand) || '';
  const priceValues = searchParams.get(QueryParams.price) || '';
  const stockValues = searchParams.get(QueryParams.stock) || '';

  const [filteredItems, setFilteredItems] = useState<Items>([]);
  const [priceDualSliderData, setPriceDualSliderData] = useState<StateDualSliderData>(
    getDualSliderData(prices, priceValues),
  );
  const [stockDualSliderData, setStockDualSliderData] = useState<StateDualSliderData>(
    getDualSliderData(stocks, stockValues),
  );

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const foundItems = filterItems({
      items,
      categoryValues,
      brandValues,
      prices,
      priceValues,
      stocks,
      stockValues,
      searchValue,
    });

    setPriceDualSliderData(getDualSliderDataAfterFiltering(prices, foundItems, 'price'));

    setStockDualSliderData(getDualSliderDataAfterFiltering(stocks, foundItems, 'stock'));

    setFilteredItems(foundItems);
  }, [isLoading, searchValue, categoryValues, brandValues]);

  useEffect(() => {
    if (location.search === '') {
      setPriceDualSliderData(getDualSliderData(prices, priceValues));
      setStockDualSliderData(getDualSliderData(stocks, stockValues));
      setFilteredItems(items);
    }
  }, [location.search]);

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
    const dataValues = sliderType === 'price' ? prices : stocks;
    const minDataValue = dataValues[minValue];
    const maxDataValue = dataValues[maxValue];
    setSearchParams((urlParams) => {
      const prev = Object.fromEntries(urlParams.entries());

      return {
        ...prev,
        [QueryParams[sliderType]]: `${minDataValue}${QUERY_PARAM_DELIMITER}${maxDataValue}`,
      };
    });
  };

  const onPriceDualSliderChange = (minValue: number, maxValue: number) => {
    onDualSliderChange(minValue, maxValue, 'price');

    const currentPriceValues = `${prices[minValue]}${QUERY_PARAM_DELIMITER}${prices[maxValue]}`;

    const foundItems = filterItems({
      items,
      categoryValues,
      brandValues,
      prices,
      priceValues: currentPriceValues,
      stocks,
      stockValues,
      searchValue,
    });

    setStockDualSliderData(getDualSliderDataAfterFiltering(stocks, foundItems, 'stock'));
    setFilteredItems(foundItems);
    setPriceDualSliderData((prev) => ({
      ...prev,
      minValue,
      maxValue,
      minDataValue: prices[minValue],
      maxDataValue: prices[maxValue],
    }));
  };

  const onStockDualSliderChange = (minValue: number, maxValue: number) => {
    onDualSliderChange(minValue, maxValue, 'stock');

    const currentStockValues = `${stocks[minValue]}${QUERY_PARAM_DELIMITER}${stocks[maxValue]}`;

    const foundItems = filterItems({
      items,
      categoryValues,
      brandValues,
      prices,
      priceValues,
      stocks,
      stockValues: currentStockValues,
      searchValue,
    });

    setPriceDualSliderData(getDualSliderDataAfterFiltering(prices, foundItems, 'price'));
    setFilteredItems(foundItems);
    setStockDualSliderData((prev) => ({
      ...prev,
      minValue,
      maxValue,
      minDataValue: stocks[minValue],
      maxDataValue: stocks[maxValue],
    }));
  };

  const onResetBtnClick = () => navigate('/');

  const categoryFilterData = getSelectListData(
    items,
    filteredItems,
    categories,
    categoryValues,
    'category',
  );

  const brandFilterData = getSelectListData(items, filteredItems, brands, brandValues, 'brand');

  const sortedItems = getSortedItems(sortValue, [...filteredItems]);

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        <div className={styles.main__leftPanel}>
          {!isLoading && (
            <Filters
              priceState={{ ...priceDualSliderData, onInput: onPriceDualSliderChange }}
              stockState={{ ...stockDualSliderData, onInput: onStockDualSliderChange }}
              categoryState={categoryFilterData}
              onCategoryFilterChange={onCategoryFilterChange}
              brandState={brandFilterData}
              onBrandFilterChange={onBrandFilterChange}
              onResetBtnClick={onResetBtnClick}
            />
          )}
        </div>

        <div className={styles.main__rightPanel}>
          <TopPanel
            itemQuantity={filteredItems.length}
            cardView={cardView}
            onViewSwitchChange={onViewSwitchChange}
            sortValue={sortValue}
            onSortValueChange={onSortValueChange}
            searchValue={searchValue}
            onSearchValueChange={onSearchValueChange}
          />
          <ProductList
            items={sortedItems}
            cardView={cardView}
            isLoading={isLoading || priceDualSliderData.max === 0}
          />
        </div>
      </div>
    </main>
  );
}

export default Main;
