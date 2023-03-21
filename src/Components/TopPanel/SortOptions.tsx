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

  const selectValue = Object.values(SortOptionValues).includes(sortValue as SortOptionValues)
    ? sortValue
    : SortOptionValues.sortTitle;

  return (
    <select value={selectValue} onChange={onChange} className={styles.sortOptions}>
      <option disabled value={SortOptionValues.sortTitle}>
        Sort options:
      </option>
      <option value={SortOptionValues.priceASC}>Sort by price ASC</option>
      <option value={SortOptionValues.priceDESC}>Sort by price DESC</option>
      <option value={SortOptionValues.ratingASC}>Sort by rating ASC</option>
      <option value={SortOptionValues.ratingDESC}>Sort by rating DESC</option>
    </select>
  );
}

export default SortOptions;
