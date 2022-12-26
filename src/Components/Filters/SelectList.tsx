import Checkbox from './Checkbox';
import { FilterData } from '../../types/data';
import styles from './SelectList.module.scss';

type SelectListProps = {
  name: string;
  filterState: FilterData;
  onChange: (id: string) => void;
};

function SelectList({ name, filterState, onChange }: SelectListProps) {
  return (
    <div>
      <h3 className={styles.selectList__name}>{name}</h3>
      <div>
        {filterState.map(({ id, isActive, name: checboxName, allItems, availableItems }) => (
          <Checkbox
            key={id}
            id={id}
            isChecked={isActive}
            name={checboxName}
            allItems={allItems}
            availableItems={availableItems}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectList;
