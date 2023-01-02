import SelectList from './SelectList';
import DualSlider from './DualSlider';
import { FilterData, DualSliderData } from '../../types/data';
import styles from './Filters.module.scss';

type FilteProps = {
  categoryState: FilterData;
  onCategoryFilterChange: (filterName: string, isActive: boolean) => void;
  brandState: FilterData;
  onBrategoryFilterChange: (filterName: string, isActive: boolean) => void;
  priceState: DualSliderData;
  stockState: DualSliderData;
};

function Filters({
  categoryState,
  onCategoryFilterChange,
  brandState,
  onBrategoryFilterChange,
  priceState,
  stockState,
}: FilteProps) {
  return (
    <div className={styles.fiters}>
      <DualSlider
        name="Prices"
        minValue={priceState.minValue}
        maxValue={priceState.maxValue}
        dataPrefix="€"
        minDataValue={priceState.minDataValue}
        maxDataValue={priceState.maxDataValue}
        max={priceState.max}
        onInput={priceState.onInput}
      />
      <DualSlider
        name="Stocks"
        minValue={stockState.minValue}
        maxValue={stockState.maxValue}
        minDataValue={stockState.minDataValue}
        maxDataValue={stockState.maxDataValue}
        max={stockState.max}
        onInput={stockState.onInput}
      />
      <SelectList name="Categories" filterState={categoryState} onChange={onCategoryFilterChange} />
      <SelectList name="Brands" filterState={brandState} onChange={onBrategoryFilterChange} />
    </div>
  );
}

export default Filters;
