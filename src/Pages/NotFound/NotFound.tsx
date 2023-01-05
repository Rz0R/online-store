import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={`${styles.notFound__container} notFound__container`}>
        <h3 className={styles.notFound__error}>404 PAGE NOT FOUND</h3>
      </div>
    </main>
  );
}

export default NotFound;
