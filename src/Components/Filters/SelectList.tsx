import { useState } from 'react';
import Checkbox from './Checkbox';

import styles from './SelectList.module.scss';

const initialCategories = [
  {
    id: 1,
    name: 'smartphones',
    isActive: false,
  },
  {
    id: 2,
    name: 'laptops',
    isActive: false,
  },
];

function SelectList() {
  const [categories, setCategories] = useState(initialCategories);

  const onChange = (id: number, isActive: boolean) =>
    setCategories((prev) => prev.map((it) => (it.id === id ? { ...it, isActive } : it)));

  return (
    <div>
      <h3 className={styles.selectList__name}>Category</h3>
      <div>
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            id={category.id.toString()}
            isChecked={category.isActive}
            name={category.name}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectList;
