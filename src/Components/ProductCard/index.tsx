import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCartItem, dropCartItem } from '../../store/reducers/cartState';
import { openModal } from '../../store/reducers/modalState';
import { Item } from '../../types/data';
import OneClick from '../Loader/oneClick';
import ImageSlider from './ImageSlider';
import styles from './ProductCard.module.scss';
import ProductInfo from './ProductInfo';

interface ProductCardProps {
  currentItem: Item;
}

export default function ProductCard({ currentItem }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.CART);
  const isCurrentItemInCart = cartItems.some((cartItem) => cartItem.id === currentItem.id);

  const handleClickBuy = () => {
    if (!isCurrentItemInCart) {
      dispatch(addCartItem(currentItem));
    } else {
      dispatch(dropCartItem(currentItem.id));
    }
  };

  const handleClickBuyNow = () => {
    if (!isCurrentItemInCart) {
      dispatch(addCartItem(currentItem));
    }
    navigate('/cart');
    dispatch(openModal());
  };

  return (
    <div className={styles.productCard}>
      <ImageSlider currentItem={currentItem} />
      <ProductInfo />

      <button
        className={
          !isCurrentItemInCart
            ? styles.productCard__buy
            : `${styles.productCard__buy} ${styles.productCard__buyActive}`
        }
        type="button"
        onClick={handleClickBuy}
      >
        {!isCurrentItemInCart ? 'Buy' : 'Remove'}
      </button>

      <button className={styles.productCard__fastBuy} type="button" onClick={handleClickBuyNow}>
        <OneClick className={styles.productCard__fastBuyIcon} />
        <span className={styles.productCard__fastBuyText}>Buy now</span>
      </button>
    </div>
  );
}
