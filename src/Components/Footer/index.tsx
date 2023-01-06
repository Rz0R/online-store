import Github from '../Loader/github';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className="footer__container">
        <div className={styles.footer__wrapper}>
          <a className={styles.footer__link} href="https://github.com/Rz0R">
            <Github className={styles.footer__githubIcon} />
          </a>

          <div className={styles.footer__inner}>
            <a className={styles.footer__link} href="https://rs.school/js/">
              <img
                className={styles.footer__rsschoolIcon}
                src="/assets/img/footer/rs_school_js.svg"
                alt="rsschool icon"
              />
            </a>
            <div className={styles.footer__year}>2023</div>
          </div>
          <a className={styles.footer__link} href="https://github.com/MetalKnock">
            <Github className={styles.footer__githubIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}
