import React from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  className: string;
}
export default function Loader({ className }: LoaderProps) {
  return (
    <svg
      className={`${styles.loader} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 340"
    >
      <circle className={styles.circle} cx="170" cy="170" r="160" stroke="#E2007C" />
      <circle className={styles.circle} cx="170" cy="170" r="135" stroke="#404041" />
      <circle className={styles.circle} cx="170" cy="170" r="110" stroke="#E2007C" />
      <circle className={styles.circle} cx="170" cy="170" r="85" stroke="#404041" />
    </svg>
  );
}
