import SelectList from './SelectList';
import styles from './Filters.module.scss';

function Filters() {
  return (
    <div className={styles.fiters}>
      <SelectList />
    </div>
  );
}

export default Filters;
