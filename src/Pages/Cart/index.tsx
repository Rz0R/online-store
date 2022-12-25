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
  const [currentPage, setCurrentPage] = useState(Math.ceil(Number(searchParams.get('page'))) || 1);
  const [cartItemsPerPage, setCartItemsPerPage] = useState(
    (Number(searchParams.get('limit')) === 0 && '3') || searchParams.get('limit') || '3',
  );
  const [memory, setMemory] = useState('');

  const limit = Number(cartItemsPerPage !== '' ? cartItemsPerPage : memory);
  const indexOfLastCartItem = currentPage * limit;
  const indexOfFirstCartItem = indexOfLastCartItem - limit;
  const currentCartItems = cartItems.slice(indexOfFirstCartItem, indexOfLastCartItem);

  if (cartItems.length === 0) {
    return (
      <main className="cart">
        <div className="cart__container">
          <CartIcon />
          <h3>Your cart is empty</h3>
        </div>
      </main>
    );
  }
  return (
    <main className="cart">
      {isOpen && <PurchaseModal />}
      <div className="cart__container">
        <h1 className={styles.cart__title}>Cart</h1>
        <Pagination
          currentPage={currentPage}
          cartItemsPerPage={cartItemsPerPage}
          memory={memory}
          limit={limit}
          currentCartItems={currentCartItems}
          setCurrentPage={setCurrentPage}
          setCartItemsPerPage={setCartItemsPerPage}
          setMemory={setMemory}
        />
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__list}>
            {currentCartItems.map((item, index) => (
              <CartItem
                className="styles.cart__list"
                key={item.id}
                item={item}
                indexOfFirstCartItem={indexOfFirstCartItem}
                index={index}
              />
            ))}
          </div>
          <TotalAmount />
        </div>
      </div>
    </main>
  );
}

export default Cart;
