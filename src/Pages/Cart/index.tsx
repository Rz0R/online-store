import { useEffect } from 'react';
import styles from './Cart.module.scss';
import CartItem from '../../Components/CartItem';
import TotalAmount from '../../Components/TotalAmount';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCartItem } from '../../store/reducers/cartState';
import loadItemsAction from '../../store/serviceActions';

function Cart() {
  const { cartItems } = useAppSelector((state) => state.CART);
  const dispatch = useAppDispatch();

  // удалить после добавления функ-ла на main ////
  const { items, isLoading } = useAppSelector((state) => state.ITEMS);

  useEffect(() => {
    if (isLoading) dispatch(loadItemsAction());
  }, []);

  const handleButton = () => {
    const randomNum = Math.floor(Math.random() * 100);
    dispatch(addCartItem(items[randomNum]));
  };
  // //////////////////////////////////////////////

  return (
    <main className="cart">
      <div className="cart__container">
        <h1 className={styles.cart__title}>Корзина</h1>
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
        <button type="button" onClick={handleButton}>
          Добавить случайный предмет в корзину
        </button>
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
