import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import Filters from '../../Components/Filters';
import ProductList from '../../Components/ProductList';
import TopPanel from '../../Components/TopPanel';
import styles from './Main.module.scss';
import { CardView } from '../../const/const';

function Main() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.ITEMS);

  const [cardView, setCardView] = useState<CardView>(CardView.simple);

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, []);

  const onViewSwitchChange = (viewMode: CardView) => setCardView(viewMode);

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        <Filters />
        {!isLoading && (
          <div className={styles.main__rightPanel}>
            <TopPanel onViewSwitchChange={onViewSwitchChange} cardView={cardView} />
            <ProductList items={items} cardView={cardView} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Main;
