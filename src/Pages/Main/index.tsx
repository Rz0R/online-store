import { useEffect, useState } from 'react';

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

function Main() {
  const dispatch = useAppDispatch();
  const { items, categories, brands, isLoading } = useAppSelector((state) => state.ITEMS);

  const [cardView, setCardView] = useState<CardView>(CardView.simple);
  const [sortValue, setSortValue] = useState<SortOptionValues>(SortOptionValues.sortTitle);
  const [searchValue, setSearchValue] = useState<string>('');
  const [categoryFilterState, setCategoryFilterState] = useState<FilterState>([]);
  const [bradnFilterState, setBrandFilterState] = useState<FilterState>([]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loadItemsAction());
    } else {
      setCategoryFilterState(getFilterState(categories));
      setBrandFilterState(getFilterState(brands));
    }
  }, [isLoading]);

  const onCategoryFilterChange = (id: string, isActive: boolean) => {
    setCategoryFilterState((prev) => prev.map((it) => (it.id === id ? { ...it, isActive } : it)));
  };

  const onBrandFilterChange = (id: string, isActive: boolean) => {
    setBrandFilterState((prev) => prev.map((it) => (it.id === id ? { ...it, isActive } : it)));
  };

  const onViewSwitchChange = (viewMode: CardView) => setCardView(viewMode);
  const onSortValueChange = (value: SortOptionValues) => setSortValue(value);
  const onSearchValueChange = (value: string) => setSearchValue(value);

  const itemsFiteredByCategories: Items = filterItems(items, categoryFilterState, 'category');

  const itemsFilteredByBrands: Items = filterItems(
    itemsFiteredByCategories,
    bradnFilterState,
    'brand',
  );

  const foundItems = findItems(itemsFilteredByBrands, searchValue);
  const sortedItems = getSortedItems[sortValue]([...foundItems]);

  const categoryFilterData = getFilterData(
    items,
    itemsFilteredByBrands,
    categoryFilterState,
    'category',
  );

  const brandFilterData = getFilterData(items, itemsFilteredByBrands, bradnFilterState, 'brand');

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        {!isLoading && (
          <>
            <Filters
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
