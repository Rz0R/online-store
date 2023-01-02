import React, { useState, useEffect } from 'react';
import { Item } from '../../../types/data';
import { IImagesWithSize } from '../../../types/imageSlider';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  currentItem: Item;
}

export default function ImageSlider({ currentItem }: ImageSliderProps) {
  const [mainImage, setMainImage] = useState(currentItem.images[0]);
  const [imagesWithoutDubplicate, setImagesWithoutDubplicate] = useState<IImagesWithSize[]>([]);

  const handleClickImage = (image: string) => {
    setMainImage(image);
  };

  useEffect(() => {
    Promise.all(currentItem.images.map((image) => fetch(image))).then((data) => {
      const imagesWithSize = data.reduce((acc: IImagesWithSize[], val) => {
        acc.push({
          url: val.url,
          size: val.headers.get('content-length'),
        });

        return acc;
      }, []);

      setImagesWithoutDubplicate(
        imagesWithSize.filter(
          (imageWithSize, i) =>
            i === imagesWithSize.findIndex((val) => val.size === imageWithSize.size),
        ),
      );
    });
  }, []);

  return (
    <div className={styles.imageSlider}>
      <img className={styles.imageSlider__main} src={mainImage} alt={currentItem.title} />
      <ul className={styles.imageSlider__slider}>
        {imagesWithoutDubplicate.map((image, i) => (
          <li
            className={
              mainImage !== image.url
                ? styles.imageSlider__item
                : `${styles.imageSlider__item} ${styles.imageSlider__itemActive}`
            }
            key={image.url}
          >
            <button
              className={styles.imageSlider__itemButton}
              onClick={() => handleClickImage(image.url)}
              type="button"
            >
              <img
                className={styles.imageSlider__itemImage}
                src={image.url}
                alt={`${currentItem.title} ${i + 1}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
