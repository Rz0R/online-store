import styles from './Cart.module.scss';
import CartItem from '../../Components/CartItem';
import TotalAmount from '../../Components/TotalAmount';

function Cart() {
  return (
    <main className="cart">
      <div className="cart__container">
        <h1 className={styles.cart__title}>Корзина</h1>
        <div className={styles.control}>
          <div className={styles.control__limit}>
            Items:
            <input type="text" value={4} />
          </div>
          <div className={styles.control__pageControl}>
            <button className={styles.control__left} type="button">
              {'<'}
            </button>
            <div className={styles.control__number}>1</div>
            <button className={styles.control__right} type="button">
              {'>'}
            </button>
          </div>
        </div>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__list}>
            <CartItem className={styles.cart__item} />
          </div>
          <TotalAmount className={styles.cart__total} />
        </div>
      </div>
    </main>
  );
}

export default Cart;
