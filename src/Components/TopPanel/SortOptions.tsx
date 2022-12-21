import { ChangeEvent } from 'react';

import { SortOptionValues } from '../../const/const';
import styles from './SortOptions.module.scss';

type SortOptionsProps = {
  sortValue: SortOptionValues;
  onSortValueChange: (value: SortOptionValues) => void;
};

function SortOptions({ sortValue, onSortValueChange }: SortOptionsProps) {
  const onChange = (evt: ChangeEvent<HTMLSelectElement>) =>
    onSortValueChange(evt.target.value as SortOptionValues);

  return (
    <select value={sortValue} onChange={onChange} className={styles.sortOptions}>
      <option disabled value={SortOptionValues.sortTitle}>
        Sort options:
      </option>
      <option value={SortOptionValues.priceASC}>Sort by price ASC</option>
      <option value={SortOptionValues.priceDESC}>Sort by price DESC</option>
      <option value={SortOptionValues.raitingASC}>Sort by raiting ASC</option>
      <option value={SortOptionValues.raitingDESC}>Sort by raiting DESC</option>
    </select>
  );
}

export default SortOptions;
