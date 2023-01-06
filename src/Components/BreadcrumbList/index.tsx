import React from 'react';

import styles from './BreadcrumbList.module.scss';

interface BreadcrumbProps {
  category: string;
  brand: string;
  title: string;
}

export default function BreadcrumbList({ category, brand, title }: BreadcrumbProps) {
  return (
    <ul className={styles.breadcrumb__list}>
      <li className={styles.breadcrumb__item}>
        <a className={styles.breadcrumb__link} href="/">
          Store
        </a>
      </li>
      <li className={styles.breadcrumb__item}>{category}</li>
      <li className={styles.breadcrumb__item}>{brand}</li>
      <li className={styles.breadcrumb__item}>{title}</li>
    </ul>
  );
}
