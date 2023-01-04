import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCartItem, dropCartItem } from '../../../store/reducers/cartState';
import { openModal } from '../../../store/reducers/modalState';
import { Item } from '../../../types/data';
import CartIcon from '../../Loader/cartIcon';
import OneClick from '../../Loader/oneClick';
import styles from './ProductButtons.module.scss';

interface ProductButtonsProps {
  currentItem: Item;
}

export default function ProductButtons({ currentItem }: ProductButtonsProps) {
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
    <div className={styles.productButtons}>
      <button
        className={
          !isCurrentItemInCart
            ? styles.productButtons__buy
            : `${styles.productButtons__buy} ${styles.productButtons__buyActive}`
        }
        type="button"
        onClick={handleClickBuy}
      >
        <CartIcon className={styles.productButtons__buyIcon} />
        {!isCurrentItemInCart ? `Buy` : `Remove`}
      </button>

      <button className={styles.productButtons__fastBuy} type="button" onClick={handleClickBuyNow}>
        <OneClick className={styles.productButtons__fastBuyIcon} />
        <span className={styles.productButtons__fastBuyText}>Buy now</span>
      </button>
    </div>
  );
}
