import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import Filters from '../../Components/Filters';
import ProductList from '../../Components/ProductList';
import styles from './Main.module.scss';

function Main() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.ITEMS);

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, []);

  return (
    <main className="main">
      <div className={`${styles.main__container} main__container`}>
        <Filters />
        {!isLoading && <ProductList items={items} />}
      </div>
    </main>
  );
}

export default Main;
