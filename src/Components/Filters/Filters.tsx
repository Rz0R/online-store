import SelectList from './SelectList';
import DualSlider from './DualSlider';
import { FilterData } from '../../types/data';
import styles from './Filters.module.scss';

type FilteProps = {
  categoryState: FilterData;
  onCategoryFilterChange: (id: string) => void;
  brandState: FilterData;
  onBrategoryFilterChange: (id: string) => void;
  priceState: {
    minValue: number;
    maxValue: number;
    minDataValue: string;
    maxDataValue: string;
    max: number;
    onInput: (minValue: number, maxValue: number) => void;
  };
  stockState: {
    minValue: number;
    maxValue: number;
    minDataValue: string;
    maxDataValue: string;
    max: number;
    onInput: (minValue: number, maxValue: number) => void;
  };
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
