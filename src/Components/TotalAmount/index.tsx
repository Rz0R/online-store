import React, { useEffect, useState } from 'react';
import { ListPromocods } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPromocode, removePromocode } from '../../store/reducers/cartState';
import { openModal } from '../../store/reducers/modalState';
import styles from './TotalAmount.module.scss';

export default function TotalAmount() {
  const { cartItemQuantity, totalPrice, promocods, discountedTotalPrice } = useAppSelector(
    (state) => state.CART,
  );
  const dispatch = useAppDispatch();
  const [promo, setPromo] = useState('');
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [indexCurrentPromocode, setIndexCurrentPromocode] = useState(-1);

  const handleChangePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(e.target.value);
  };

  const handleClickApplyPromo = () => {
    dispatch(addPromocode(ListPromocods[indexCurrentPromocode]));
    setPromo('');
  };

  useEffect(() => {
    setIndexCurrentPromocode(ListPromocods.findIndex((promocode) => promocode.name === promo));
  }, [promo]);

  useEffect(() => {
    if (indexCurrentPromocode !== -1) {
      setIsValidPromo(true);
    } else {
      setIsValidPromo(false);
    }
  }, [indexCurrentPromocode]);

  return (
    <div className={`${styles.totalAmount}`}>
      <div className={styles.totalAmount__inner}>
        <h4 className={styles.totalAmount__title}>TOTAL:</h4>
        <div className={styles.totalAmount__priceContainer}>
          {promocods.length > 0 && (
            <div className={styles.totalAmount__discountedPrice}>€{discountedTotalPrice}</div>
          )}
          <div className={styles.totalAmount__price}>€{totalPrice}</div>
        </div>

        <div className={styles.totalAmount__amount}>
          {' '}
          {cartItemQuantity} {cartItemQuantity === 1 ? 'item' : 'items'}
        </div>
      </div>
      <div className={styles.totalAmount__wrap}>
        <div className={styles.promocode}>
          <h6 className={styles.promocode__title}>Promo code:</h6>
          <input
            className={styles.promocode__input}
            type="text"
            placeholder="Enter promo code"
            value={promo}
            onChange={handleChangePromo}
          />
          <button
            className={`${styles.promocode__apply} ${
              isValidPromo && styles.promocode__applyActive
            }`}
            type="button"
            onClick={handleClickApplyPromo}
          >
            Apply
          </button>
        </div>
        <ul className={styles.promocodeList}>
          {promocods.map((promocod) => (
            <li className={styles.promocodeItem}>
              <div className={styles.promocodeItem__name}>{promocod.name}</div>
              <div className={styles.promocodeItem__discount}>{promocod.discount * 100}%</div>
              <button
                type="button"
                className={styles.promocodeItem__close}
                onClick={() => dispatch(removePromocode(promocod.name))}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <button
          className={styles.totalAmount__checkout}
          type="button"
          onClick={() => dispatch(openModal())}
        >
          Check out
        </button>
      </div>
    </div>
  );
}
