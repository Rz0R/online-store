import React from 'react';
import styles from './CartItem.module.scss';
import temporary from '../../Assets/temporary.jpg';

interface CartItemProps {
  className: string | undefined;
}

export default function CartItem({ className }: CartItemProps) {
  return (
    <div className={`${styles.item} ${className}`}>
      <img className={styles.item__image} src={temporary} alt="change-text" />
      <h3 className={styles.item__title}>lighting ceiling kitchen</h3>
      <div className={styles.price}>
        <div className={styles.price__inner}>
          <div className={styles.price__quantity}>2</div>
          <span className={styles.price__multi}>x</span>
          <div className={styles.price__priceOne}>€930.00</div>
        </div>
        <div className={styles.price__totalPrice}>€1860.00</div>
      </div>
      <div className={styles.countButtons}>
        <button className={styles.countButtons__dec} type="button">
          -
        </button>
        <div className={styles.countButtons__quantity}>2</div>
        <button className={styles.countButtons__inc} type="button">
          +
        </button>
      </div>
    </div>
  );
}
