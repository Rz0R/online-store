import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { CartItem } from '../../types/data';
import { getSearchParams } from '../../utils/common';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  cartItemsPerPage: string;
  memory: string;
  limit: number;
  currentCartItems: CartItem[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCartItemsPerPage: React.Dispatch<React.SetStateAction<string>>;
  setMemory: React.Dispatch<React.SetStateAction<string>>;
}

export default function Pagination({
  currentPage,
  cartItemsPerPage,
  memory,
  limit,
  currentCartItems,
  setCurrentPage,
  setCartItemsPerPage,
  setMemory,
}: PaginationProps) {
  const [, setSearchParams] = useSearchParams();
  const { cartItems } = useAppSelector((state) => state.CART);
  const numberOfPages = Math.ceil(cartItems.length / limit);

  const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;

    if (Number.isNaN(Number(currentValue))) {
      setCartItemsPerPage('1');
    }

    switch (currentValue) {
      case '':
        if (!memory) {
          setMemory(cartItemsPerPage);
        }
        setCartItemsPerPage(currentValue);
        break;
      case '0':
        setCartItemsPerPage('1');
        break;
      case '00':
        setCartItemsPerPage('01');
        break;
      default:
        setCartItemsPerPage(currentValue);
    }
  };

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(numberOfPages);
    }

    if (Number(cartItemsPerPage) < 0 || Number.isNaN(Number(cartItemsPerPage))) {
      setCartItemsPerPage('1');
    }

    setSearchParams({
      ...getSearchParams(),
      limit: cartItemsPerPage,
    });
  }, [cartItemsPerPage]);

  useEffect(() => {
    if (currentPage <= 0) {
      setCurrentPage(1);
    }

    setSearchParams({
      ...getSearchParams(),
      page: currentPage.toString(),
    });
  }, [currentPage]);

  useEffect(() => {
    if (currentCartItems.length === 0 && cartItems.length !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentCartItems]);

  const handleClickNextPage = () => currentPage < numberOfPages && setCurrentPage(currentPage + 1);

  const handleClickPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className={styles.control}>
      <div className={styles.control__limit}>
        Items:
        <InputMask
          mask="99"
          maskChar=""
          type="text"
          value={cartItemsPerPage}
          onChange={handleChangeItemsPerPage}
        />
      </div>
      <div className={styles.control__pageControl}>
        <button className={styles.control__left} type="button" onClick={handleClickPrevPage}>
          {'<'}
        </button>
        <div className={styles.control__number}>{currentPage}</div>
        <button className={styles.control__right} type="button" onClick={handleClickNextPage}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
