import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openModal } from '../../store/reducers/modalState';
import styles from './TotalAmount.module.scss';

export default function TotalAmount() {
  const { cartItemQuantity, totalPrice } = useAppSelector((state) => state.CART);
  const dispatch = useAppDispatch();

  return (
    <div className={`${styles.totalAmount}`}>
      <div className={styles.totalAmount__inner}>
        <h4 className={styles.totalAmount__title}>ИТОГО:</h4>
        <div className={styles.totalAmount__price}>€{totalPrice}</div>
        <div className={styles.totalAmount__amount}>Товаров: {cartItemQuantity}</div>
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
        <button
          className={styles.totalAmount__button}
          type="button"
          onClick={() => dispatch(openModal())}
        >
          Оформить заказ
        </button>
        <button className={styles.totalAmount__buttonQuick} type="button">
          Заказ в 1 клик
        </button>
      </div>
    </div>
  );
}
