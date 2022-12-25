import SelectList from './SelectList';
import { FilterData } from '../../types/data';
import styles from './Filters.module.scss';

type FilteProps = {
  categoryState: FilterData;
  onCategoryFilterChange: (id: string, isActive: boolean) => void;
  brandState: FilterData;
  onBrategoryFilterChange: (id: string, isActive: boolean) => void;
};

function Filters({
  categoryState,
  onCategoryFilterChange,
  brandState,
  onBrategoryFilterChange,
}: FilteProps) {
  return (
    <div className={styles.fiters}>
      <SelectList name="Categories" filterState={categoryState} onChange={onCategoryFilterChange} />
      <SelectList name="Brands" filterState={brandState} onChange={onBrategoryFilterChange} />
    </div>
  );
}

export default Filters;
