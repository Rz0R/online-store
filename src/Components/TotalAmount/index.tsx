import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openModal } from '../../store/reducers/modalState';
import Promocodes from '../Promocodes/index';
import styles from './TotalAmount.module.scss';

export default function TotalAmount() {
  const { cartItemQuantity, totalPrice, promocodes, discountedTotalPrice } = useAppSelector(
    (state) => state.CART,
  );
  const dispatch = useAppDispatch();

  return (
    <div className={styles.totalAmount}>
      <div className={styles.totalAmount__wrapper}>
        <div className={styles.totalAmount__summary}>
          <div className={styles.totalAmount__inner}>
            <h4 className={styles.totalAmount__title}>TOTAL:</h4>
            <div className={styles.totalAmount__priceContainer}>
              {promocodes.length > 0 && (
                <div className={styles.totalAmount__oldPrice}>€{totalPrice}</div>
              )}
              <div className={styles.totalAmount__price}>
                €{promocodes.length > 0 ? discountedTotalPrice : totalPrice}
              </div>
            </div>
          </div>
          <div className={styles.totalAmount__amount}>Products: {cartItemQuantity}</div>
        </div>
        <div className={styles.totalAmount__wrap}>
          <Promocodes />
          <button
            className={styles.totalAmount__checkout}
            type="button"
            onClick={() => dispatch(openModal())}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}
