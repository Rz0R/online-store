import styles from './Checkbox.module.scss';

type CheckBoxProps = {
  id: string;
  isChecked: boolean;
  name: string;
  onChange: (id: number, isChecked: boolean) => void;
};

function CheckBox({ id, name, isChecked, onChange }: CheckBoxProps) {
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkbox__input}
        type="checkbox"
        checked={isChecked}
        id={id}
        onChange={() => onChange(+id, !isChecked)}
      />
      <label className={styles.checkbox__label} htmlFor={id}>
        {name}
      </label>
    </div>
  );
}

export default CheckBox;
