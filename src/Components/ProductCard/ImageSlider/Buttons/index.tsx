import React from 'react';
import { IImagesWithSize } from '../../../../types/imageSlider';
import ArrowLeft from '../../../Loader/arrowLeft';
import ArrowRight from '../../../Loader/arrowRight';
import styles from './Buttons.module.scss';

interface ButtonsProps {
  slideNumber: number;
  imagesWithoutDuplicate: IImagesWithSize[];
  quantityVisibleSlides: number;
  setSlideNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function Buttons({
  slideNumber,
  imagesWithoutDuplicate,
  quantityVisibleSlides,
  setSlideNumber,
}: ButtonsProps) {
  const handleClickRightArrow = () => {
    if (slideNumber < imagesWithoutDuplicate.length - quantityVisibleSlides) {
      setSlideNumber(slideNumber + 1);
    }
  };

  const handleClickLeftArrow = () => {
    if (slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    }
  };

  return (
    <div className={styles.buttons__buttons}>
      <button
        className={`${styles.buttons__button} ${styles.buttons__buttonLeft} ${
          slideNumber > 0 ? styles.buttons__buttonLeftActive : ''
        }`}
        type="button"
        onClick={handleClickLeftArrow}
      >
        <ArrowLeft className={styles.buttons__buttonLeftIcon} />
      </button>
      <button
        className={`${styles.buttons__button} ${styles.buttons__buttonRight} ${
          slideNumber < imagesWithoutDuplicate.length - quantityVisibleSlides
            ? styles.buttons__buttonRightActive
            : ''
        }`}
        type="button"
        onClick={handleClickRightArrow}
      >
        <ArrowRight className={styles.buttons__buttonRightIcon} />
      </button>
    </div>
  );
}
