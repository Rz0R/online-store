import React, { useState, useEffect } from 'react';
import { ListPromocodes } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPromocode, removePromocode } from '../../store/reducers/cartState';
import Close from '../Loader/close';
import styles from './Promocodes.module.scss';

export default function Promocodes() {
  const { promocodes } = useAppSelector((state) => state.CART);
  const dispatch = useAppDispatch();
  const [promo, setPromo] = useState('');
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [indexCurrentPromocode, setIndexCurrentPromocode] = useState(-1);
  const [showError, setShowError] = useState(false);

  const handleChangePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(e.target.value);
    setShowError(false);
  };

  const handleClickApplyPromo = () => {
    if (isValidPromo) {
      dispatch(addPromocode(ListPromocodes[indexCurrentPromocode]));
      setPromo('');
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    setIndexCurrentPromocode(ListPromocodes.findIndex((promocode) => promocode.name === promo));
  }, [promo]);

  useEffect(() => {
    if (indexCurrentPromocode !== -1) {
      setIsValidPromo(true);
    } else {
      setIsValidPromo(false);
    }
  }, [indexCurrentPromocode]);

  return (
    <>
      <div className={styles.promocode}>
        <h6 className={styles.promocode__title}>
          Promo code:
          <span className={styles.promocode__test}>RS, EPM</span>
        </h6>
        <div className={styles.promocode__inner}>
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
            <span className={styles.promocode__applyText}>Apply</span>
          </button>
          {!isValidPromo && showError && (
            <div className={styles.promocode__error}>Invalid promo code</div>
          )}
        </div>
      </div>
      <ul className={styles.promocodeList}>
        {promocodes.map((promocode) => (
          <li className={styles.promocodeItem} key={promocode.name}>
            <div className={styles.promocodeItem__name}>{promocode.fullName}</div>
            <div className={styles.promocodeItem__discount}>{promocode.discount * 100}%</div>
            <button
              type="button"
              className={styles.promocodeItem__close}
              onClick={() => dispatch(removePromocode(promocode.name))}
            >
              <Close className={styles.promocodeItem__closeIcon} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
