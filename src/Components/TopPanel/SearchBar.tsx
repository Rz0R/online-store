import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { debounce } from '../../utils/common';
import styles from './SearchBar.module.scss';

const DEBOUNCE_DELAY = 300;

type SearchBarProps = {
  defaultValue: string;
  onSearchValueChange: (value: string) => void;
};

function SearchBar({ defaultValue, onSearchValueChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((value: string) => onSearchValueChange(value), DEBOUNCE_DELAY),
    [],
  );

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
    updateSearchValue(evt.target.value);
  };

  const onClearButtonClick = () => {
    setInputValue('');
    updateSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchBar}>
      <svg
        className={styles.searchBar__icon}
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        fill="none"
        viewBox="0 0 19 19"
      >
        <path
          stroke="#a19d9d"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M13.336 13.335L18 18m-2.665-9.494a6.828 6.828 0 11-13.656 0 6.828 6.828 0 0113.656 0z"
        />
      </svg>
      <input
        className={styles.searchBar__input}
        value={inputValue}
        onChange={onInputChange}
        ref={inputRef}
        type="search"
        placeholder="Search product"
      />
      {inputValue && (
        <button className={styles.searchBar__clearBtn} onClick={onClearButtonClick} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
