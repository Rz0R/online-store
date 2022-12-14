import { Link } from 'react-router-dom';

import Cart from './Cart';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className="header">
      <div className={`header__container ${styles.header__container}`}>
        <Link className={styles.header__logo} to="/">
          <img src="/assets/img/header/logo.png" alt="logo" />
        </Link>

        <Cart />
      </div>
    </header>
  );
}
