import React, { useState } from 'react';
import { Item } from '../../../types/data';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  currentItem: Item;
}

export default function ImageSlider({ currentItem }: ImageSliderProps) {
  const [mainImage, setMainImage] = useState(currentItem.images[0]);

  const handleClickImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={styles.imageSlider}>
      <img className={styles.imageSlider__main} src={mainImage} alt={currentItem.title} />
      <ul className={styles.imageSlider__slider}>
        {currentItem.images.map((image, i) => (
          <li
            className={
              mainImage !== image
                ? styles.imageSlider__item
                : `${styles.imageSlider__item} ${styles.imageSlider__itemActive}`
            }
            key={image}
          >
            <button
              className={styles.imageSlider__itemButton}
              onClick={() => handleClickImage(image)}
              type="button"
            >
              <img
                className={styles.imageSlider__itemImage}
                src={image}
                alt={`${currentItem.title} ${i + 1}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
