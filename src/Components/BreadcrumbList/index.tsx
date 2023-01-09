import React from 'react';
import { Link } from 'react-router-dom';

import styles from './BreadcrumbList.module.scss';

export interface BreadcrumbProps {
  category: string;
  brand: string;
  title: string;
}

export default function BreadcrumbList({ category, brand, title }: BreadcrumbProps) {
  return (
    <ul className={styles.breadcrumb__list}>
      <li className={styles.breadcrumb__item}>
        <Link className={styles.breadcrumb__link} to="/">
          Store
        </Link>
      </li>
      <li className={styles.breadcrumb__item}>{category}</li>
      <li className={styles.breadcrumb__item}>{brand}</li>
      <li className={styles.breadcrumb__item}>{title}</li>
    </ul>
  );
}
