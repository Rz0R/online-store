import styles from './Cart.module.scss';

const count = 1;
const totalPrice = 5;

function Cart() {
  return (
    <div className={styles.cart}>
      <div className={styles.cart__icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <g
            fill="currentColor"
            strokeMiterlimit="10"
            strokeWidth="0"
            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          >
            <path d="M73.713 65.44H27.689c-3.566 0-6.377-2.578-6.686-6.13-.21-2.426.807-4.605 2.592-5.939L16.381 21.07a3 3 0 012.927-3.654H87a3 3 0 012.832 3.988l-7.798 22.344a9.153 9.153 0 01-7.063 5.999l-47.389 8.281-.032.005c-.228.04-.623.126-.568.759.056.648.48.648.708.648h46.024a3 3 0 11-.001 6zm-50.66-42.024l6.301 28.211 44.583-7.79a3.153 3.153 0 002.432-2.065l6.406-18.356H23.053z" />
            <circle cx="28.25" cy="75.8" r="6.5" />
            <circle cx="68.29" cy="75.8" r="6.5" />
            <path d="M19.306 23.417a3.001 3.001 0 01-2.925-2.347l-1.375-6.155a5.356 5.356 0 00-5.258-4.212H3a3 3 0 110-6h6.749c5.372 0 9.942 3.662 11.113 8.904l1.375 6.155a3 3 0 01-2.931 3.655z" />
          </g>
        </svg>
        {count > 0 && <span className={styles.cart__count}>{count}</span>}
      </div>

      <div>
        <div className={styles.cart__title}>Корзина</div>
        <div className={styles.cart__total}>{`$${totalPrice}`}</div>
      </div>
    </div>
  );
}

export default Cart;
