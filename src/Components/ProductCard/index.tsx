import React from 'react';

import { Item } from '../../types/data';
import ImageSlider from './ImageSlider';
import ProductButtons from './ProductButtons';
import styles from './ProductCard.module.scss';
import ProductInfo from './ProductInfo';

interface ProductCardProps {
  currentItem: Item;
}

export default function ProductCard({ currentItem }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <ImageSlider currentItem={currentItem} />
      <div className={styles.productCard__column}>
        <ProductInfo currentItem={currentItem} />
        <ProductButtons currentItem={currentItem} />
      </div>
    </div>
  );
}
