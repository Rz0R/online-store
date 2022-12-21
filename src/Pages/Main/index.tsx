import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import Filters from '../../Components/Filters';
import ProductList from '../../Components/ProductList';
import TopPanel from '../../Components/TopPanel';
import { CardView, SortOptionValues } from '../../const/const';
import { getSortedItems } from '../../utils/common';
import styles from './Main.module.scss';

function Main() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.ITEMS);

  const [cardView, setCardView] = useState<CardView>(CardView.simple);
  const [sortValue, setSortValue] = useState<SortOptionValues>(SortOptionValues.sortTitle);

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, []);

  const onViewSwitchChange = (viewMode: CardView) => setCardView(viewMode);
  const onSortValueChange = (value: SortOptionValues) => setSortValue(value);

  const sortedItems = getSortedItems[sortValue]([...items]);

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        <Filters />
        {!isLoading && (
          <div className={styles.main__rightPanel}>
            <TopPanel
              cardView={cardView}
              onViewSwitchChange={onViewSwitchChange}
              sortValue={sortValue}
              onSortValueChange={onSortValueChange}
            />
            <ProductList items={sortedItems} cardView={cardView} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Main;
