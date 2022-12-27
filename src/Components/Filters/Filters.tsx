import SelectList from './SelectList';
import DualSlider from './DualSlider';
import { FilterData } from '../../types/data';
import styles from './Filters.module.scss';

type FilteProps = {
  categoryState: FilterData;
  onCategoryFilterChange: (id: string) => void;
  brandState: FilterData;
  onBrategoryFilterChange: (id: string) => void;
};

function Filters({
  categoryState,
  onCategoryFilterChange,
  brandState,
  onBrategoryFilterChange,
}: FilteProps) {
  return (
    <div className={styles.fiters}>
      <DualSlider />
      <SelectList name="Categories" filterState={categoryState} onChange={onCategoryFilterChange} />
      <SelectList name="Brands" filterState={brandState} onChange={onBrategoryFilterChange} />
    </div>
  );
}

export default Filters;
