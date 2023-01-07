import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Cart.module.scss';
import CartItem from '../../Components/CartItem';
import TotalAmount from '../../Components/TotalAmount';
import { useAppSelector } from '../../hooks/redux';
import PurchaseModal from '../../Components/PurchaseModal';
import CartIcon from '../../Components/Loader/cartIcon';
import Pagination from '../../Components/Pagination';

function Cart() {
  const { isOpen } = useAppSelector((state) => state.MODAL);
  const { cartItems } = useAppSelector((state) => state.CART);

  const [searchParams] = useSearchParams();
  const pageParam = Math.ceil(Number(searchParams.get('page')));
  const limitParam = Math.ceil(Number(searchParams.get('limit')));

  const [currentPage, setCurrentPage] = useState(
    ((pageParam < 1 || Number.isNaN(pageParam)) && 1) || pageParam,
  );
  const [cartItemsPerPage, setCartItemsPerPage] = useState(
    ((limitParam < 1 || Number.isNaN(limitParam)) && '10') || limitParam.toString(),
  );
  const [memory, setMemory] = useState('');

  const limit = Number(cartItemsPerPage !== '' ? cartItemsPerPage : memory);
  const indexOfLastCartItem = currentPage * limit;
  const indexOfFirstCartItem = indexOfLastCartItem - limit;
  const currentCartItems = cartItems.slice(indexOfFirstCartItem, indexOfLastCartItem);

  if (cartItems.length === 0) {
    return (
      <main className={`cartEmpty ${styles.cartEmpty}`}>
        <div className={`cartEmpty__container ${styles.cartEmpty__container}`}>
          <CartIcon className={styles.cartEmpty__icon} />
          <h3 className={styles.cartEmpty__title}>Your cart is empty</h3>
        </div>
      </main>
    );
  }
  return (
    <main className="cart">
      {isOpen && <PurchaseModal />}
      <div className="cart__container">
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__column}>
            <div className={`${styles.cart__menu} ${styles.menu}`}>
              <h1 className={styles.menu__title}>Cart</h1>
              <Pagination
                className={styles.menu__control}
                currentPage={currentPage}
                cartItemsPerPage={cartItemsPerPage}
                memory={memory}
                limit={limit}
                currentCartItems={currentCartItems}
                setCurrentPage={setCurrentPage}
                setCartItemsPerPage={setCartItemsPerPage}
                setMemory={setMemory}
              />
            </div>
            <div className={styles.cart__list}>
              {currentCartItems.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  indexOfFirstCartItem={indexOfFirstCartItem}
                  index={index}
                />
              ))}
            </div>
          </div>
          <TotalAmount />
        </div>
      </div>
    </main>
  );
}

export default Cart;
