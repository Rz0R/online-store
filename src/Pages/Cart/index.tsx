import styles from './Cart.module.scss';
import CartItem from '../../Components/CartItem';
import TotalAmount from '../../Components/TotalAmount';
import { useAppSelector } from '../../hooks/redux';

import PurchaseModal from '../../Components/PurchaseModal';

function Cart() {
  const { isOpen } = useAppSelector((state) => state.MODAL);
  const { cartItems } = useAppSelector((state) => state.CART);

  return (
    <main className="cart">
      {isOpen && <PurchaseModal />}
      <div className="cart__container">
        <h1 className={styles.cart__title}>Cart</h1>
        <div className={styles.control}>
          <div className={styles.control__limit}>
            Items:
            <input type="text" placeholder="4" />
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
            {cartItems.map((item) => (
              <CartItem className="styles.cart__list" key={item.id} item={item} />
            ))}
          </div>
          <TotalAmount />
        </div>
      </div>
    </main>
  );
}

export default Cart;
