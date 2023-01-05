import SelectList from './SelectList';
import DualSlider from './DualSlider';
import CopyLinkButton from './CopyLinkButton';
import { FilterData, DualSliderData } from '../../types/data';
import styles from './Filters.module.scss';

type FilterProps = {
  categoryState: FilterData;
  onCategoryFilterChange: (filterName: string, isActive: boolean) => void;
  brandState: FilterData;
  onBrandFilterChange: (filterName: string, isActive: boolean) => void;
  priceState: DualSliderData;
  stockState: DualSliderData;
  onResetBtnClick: () => void;
};

function Filters({
  categoryState,
  onCategoryFilterChange,
  brandState,
  onBrandFilterChange,
  priceState,
  stockState,
  onResetBtnClick,
}: FilterProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__top}>
        <button className={styles.filters__btn} type="button" onClick={onResetBtnClick}>
          Reset Filters
        </button>

        <CopyLinkButton />
      </div>
      <div className={styles.filters__content}>
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
        <SelectList
          name="Categories"
          filterState={categoryState}
          onChange={onCategoryFilterChange}
        />
        <SelectList name="Brands" filterState={brandState} onChange={onBrandFilterChange} />
      </div>
    </div>
  );
}

export default Filters;
