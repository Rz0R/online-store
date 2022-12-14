import React, { useState } from 'react';
import { getLocalStorage, TempGetLocalStorage } from '../../Helpers/getLocalStorage';
import setLocalStorage from '../../Helpers/setLocalStorage';
import styles from './CartItem.module.scss';

interface CartItemProps {
  className: string | undefined;
  title: string;
  price: number;
  images: Array<string>;
  amount: number;
  id: number;
  stock: number;
  setData: React.Dispatch<React.SetStateAction<TempGetLocalStorage>>;
}

export default function CartItem({
  className,
  title,
  price,
  images,
  amount,
  id,
  stock,
  setData,
}: CartItemProps) {
  const [curAmount, setCurAmount] = useState(amount);

  function setAmountInLocalStorage(operation: string) {
    const data = getLocalStorage();
    const indexCurItem = data.cartItems.findIndex((item) => item.id === id);
    if (operation === 'plus') {
      data.cartItems[indexCurItem].amount += 1;
    } else if (operation === 'minus') {
      data.cartItems[indexCurItem].amount -= 1;
    }
    setLocalStorage(data);
  }

  function handleDecAmount() {
    if (curAmount - 1 > 0) {
      setCurAmount(curAmount - 1);
      setAmountInLocalStorage('minus');
      setData(getLocalStorage());
    } else {
      const data = getLocalStorage();
      data.cartItems = data.cartItems.filter((val) => val.id !== id);
      setLocalStorage(data);
      setData(getLocalStorage());
    }
  }

  function handleIncAmount() {
    if (curAmount < stock) {
      setCurAmount(curAmount + 1);
      setAmountInLocalStorage('plus');
      setData(getLocalStorage());
    }
  }

  return (
    <div className={`${styles.item} ${className}`}>
      <img className={styles.item__image} src={images[0]} alt="change-text" />
      <h3 className={styles.item__title}>{title}</h3>
      <div className={styles.price}>
        <div className={styles.price__inner}>
          <div className={styles.price__quantity}>{curAmount}</div>
          <span className={styles.price__multi}>x</span>
          <div className={styles.price__priceOne}>€{price}</div>
        </div>
        <div className={styles.price__totalPrice}>€{Math.floor(curAmount * price)}</div>
      </div>
      <div className={styles.countButtons}>
        <button className={styles.countButtons__dec} type="button" onClick={handleDecAmount}>
          -
        </button>
        <div className={styles.countButtons__quantity}>{curAmount}</div>
        <button className={styles.countButtons__inc} type="button" onClick={handleIncAmount}>
          +
        </button>
      </div>
      <div className={styles.stock}>На складе: {stock} шт.</div>
    </div>
  );
}
