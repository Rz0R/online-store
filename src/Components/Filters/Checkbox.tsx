import styles from './Checkbox.module.scss';

type CheckBoxProps = {
  id: string;
  isChecked: boolean;
  name: string;
  allItems: number;
  availableItems: number;
  onChange: (filterName: string, isActive: boolean) => void;
};

function CheckBox({ id, name, allItems, availableItems, isChecked, onChange }: CheckBoxProps) {
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkbox__input}
        type="checkbox"
        checked={isChecked}
        id={id}
        onChange={() => onChange(name, !isChecked)}
      />
      <label className={styles.checkbox__label} htmlFor={id}>
        <span>{name}</span>
        <span>
          ({availableItems}/{allItems})
        </span>
      </label>
    </div>
  );
}

export default CheckBox;
