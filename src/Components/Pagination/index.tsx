import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { CartItem } from '../../types/data';
import { getSearchParams } from '../../utils/common';
import ArrowLeft from '../Loader/arrowLeft';
import ArrowRight from '../Loader/arrowRight';
import styles from './Pagination.module.scss';

interface PaginationProps {
  className: string;
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
  className,
  currentPage,
  cartItemsPerPage,
  memory,
  limit,
  currentCartItems,
  setCurrentPage,
  setCartItemsPerPage,
  setMemory,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useAppSelector((state) => state.CART);
  const numberOfPages = Math.ceil(cartItems.length / limit);

  const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;

    switch (currentValue) {
      case '':
      case '0':
      case '00':
        if (!memory) {
          setMemory(cartItemsPerPage);
        }
        setCartItemsPerPage('');
        break;
      default:
        setCartItemsPerPage(currentValue);
        setMemory('');
    }

    setSearchParams({
      ...getSearchParams(),
      limit: currentValue,
    });
  };

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(numberOfPages);

      setSearchParams({
        ...getSearchParams(),
        page: numberOfPages.toString(),
      });
    }
  }, [currentPage, currentCartItems]);

  useEffect(() => {
    if (Array.from(searchParams).length === 0) {
      setCurrentPage(1);
      setCartItemsPerPage('10');
    }
  }, [searchParams]);

  const handleClickNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);

      setSearchParams({
        ...getSearchParams(),
        page: (currentPage + 1).toString(),
      });
    }
  };

  const handleClickPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSearchParams({
        ...getSearchParams(),
        page: (currentPage - 1).toString(),
      });
    }
  };

  return (
    <div className={`${styles.control} ${className}`}>
      <div className={styles.control__limit}>
        Limit:
        <InputMask
          mask="99"
          maskChar=""
          type="text"
          value={cartItemsPerPage}
          onChange={handleChangeItemsPerPage}
          className={styles.control__input}
        />
      </div>
      <div className={styles.control__pageControl}>
        <button
          className={
            currentPage !== 1
              ? styles.control__left
              : `${styles.control__left} ${styles.control__leftDisable}`
          }
          type="button"
          onClick={handleClickPrevPage}
        >
          <ArrowLeft className={styles.control__leftIcon} />
        </button>
        <div className={styles.control__number}>{currentPage}</div>
        <button
          className={
            currentPage !== numberOfPages
              ? styles.control__right
              : `${styles.control__right} ${styles.control__rightDisable}`
          }
          type="button"
          onClick={handleClickNextPage}
        >
          <ArrowRight className={styles.control__rightIcon} />
        </button>
      </div>
    </div>
  );
}
