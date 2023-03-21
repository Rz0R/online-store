import React from 'react';
import { Item } from '../../../types/data';
import { getPriceWithoutDiscount } from '../../../utils/common';
import styles from './ProductInfo.module.scss';

interface ProductInfoProps {
  currentItem: Item;
}

export default function ProductInfo({ currentItem }: ProductInfoProps) {
  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productInfo__title}>{currentItem.title}</h2>
      <div>
        <div className={styles.productInfo__price}>€{currentItem.price}</div>
        <div className={`${styles.productInfo__price} ${styles.productInfo__oldPrice}`}>
          €{getPriceWithoutDiscount(currentItem.price, currentItem.discountPercentage)}
        </div>
      </div>
      <div className={styles.productInfo__discount}>
        Discount €
        {getPriceWithoutDiscount(currentItem.price, currentItem.discountPercentage) -
          currentItem.price}
      </div>
      <div className={`${styles.productInfo__properties} ${styles.properties}`}>
        <div className={styles.properties__wrap}>
          <h5 className={styles.properties__title}>Rating:</h5>
          <div className={styles.properties__separator}>{}</div>
          <div className={styles.properties__data}>{currentItem.rating}</div>
        </div>
        <div className={styles.properties__wrap}>
          <h5 className={styles.properties__title}>Stock:</h5>
          <div className={styles.properties__separator}>{}</div>
          <div className={styles.properties__data}>{currentItem.stock}</div>
        </div>
        <div className={styles.properties__wrap}>
          <h5 className={styles.properties__title}>Category:</h5>
          <div className={styles.properties__separator}>{}</div>
          <div className={styles.properties__data}>{currentItem.category}</div>
        </div>
        <div className={styles.properties__wrap}>
          <h5 className={styles.properties__title}>Brand:</h5>
          <div className={styles.properties__separator}>{}</div>
          <div className={styles.properties__data}>{currentItem.brand}</div>
        </div>
      </div>
      <div className={styles.productInfo__descriptionWrapper}>
        Description:
        <div className={styles.productInfo__description}>{currentItem.description}</div>
      </div>
    </div>
  );
}
