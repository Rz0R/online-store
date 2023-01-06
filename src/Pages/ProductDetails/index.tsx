import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Warning from '../../Components/Loader/warning';
import styles from './ProductDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';
import BreadcrumbList from '../../Components/BreadcrumbList';
import ProductCard from '../../Components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.ITEMS);

  const currentItem = items.find((item) => item.id === Number(id));

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, []);

  if (!isLoading && !currentItem) {
    return (
      <main className={`productDetails ${styles.productDetailsEmpty}`}>
        <div className={`productDetails__container ${styles.productDetailsEmpty__container}`}>
          <Warning className={styles.productDetailsEmpty__icon} bgColor={styles.whiteColor} />
          <h3 className={styles.productDetailsEmpty__title}>Product with id {id} not found</h3>
        </div>
      </main>
    );
  }
  return (
    <main className="productDetails">
      <div className="productDetails__container">
        <div className={styles.productDetails__wrapper}>
          {currentItem && (
            <BreadcrumbList
              category={currentItem.category}
              brand={currentItem.brand}
              title={currentItem.title}
            />
          )}
          {currentItem && <ProductCard currentItem={currentItem} />}
        </div>
      </div>
    </main>
  );
}
