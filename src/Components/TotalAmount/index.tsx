import React from 'react';
import styles from './TotalAmount.module.scss';

interface TotalAmountProps {
  className: string | undefined;
}

export default function TotalAmount({ className }: TotalAmountProps) {
  return (
    <div className={`${styles.totalAmount} ${className}`}>
      <div className={styles.totalAmount__inner}>
        <h4 className={styles.totalAmount__title}>ИТОГО:</h4>
        <div className={styles.totalAmount__price}>€1860.00</div>
        <div className={styles.totalAmount__amount}>Товаров: 2</div>
      </div>
      <div className={styles.totalAmount__wrap}>
        <div className={styles.promocode}>
          <h6 className={styles.promocode__title}>Промокод или купон на скидку:</h6>
          <input className={styles.promocode__input} type="text" />
          <button className={styles.promocode__button} type="button">
            Применить
          </button>
        </div>
        <ul className={styles.promocodeList}>
          <li className={styles.promocodeItem}>
            <div className={styles.promocodeItem__name}>Промокод 1</div>
            <button type="button" className={styles.promocodeItem__close}>
              X
            </button>
          </li>
        </ul>
        <button className={styles.totalAmount__button} type="button">
          Оформить заказ
        </button>
        <button className={styles.totalAmount__buttonQuick} type="button">
          Заказ в 1 клик
        </button>
      </div>
    </div>
  );
}
