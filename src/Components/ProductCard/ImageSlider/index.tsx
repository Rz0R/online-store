import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { Item } from '../../../types/data';
import { IImagesWithSize } from '../../../types/imageSlider';
import { getImagesWithoutDuplicate } from '../../../utils/common';
import Buttons from './Buttons';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  currentItem: Item;
}

export default function ImageSlider({ currentItem }: ImageSliderProps) {
  const [mainImage, setMainImage] = useState(currentItem.images[0]);
  const [imagesWithoutDuplicate, setImagesWithoutDuplicate] = useState<IImagesWithSize[]>([]);
  const [isVisibleButtons, setIsVisibleButtons] = useState(false);
  const [widthSlide, setWidthSlide] = useState(0);
  const [gap, setGap] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);

  const ref = useRef<HTMLLIElement>(null);
  const refSlider = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLUListElement>(null);

  const quantityVisibleSlides = 4;

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

      setImagesWithoutDuplicate(getImagesWithoutDuplicate(imagesWithSize));
    });
  }, []);

  useEffect(() => {
    if (imagesWithoutDuplicate.length > quantityVisibleSlides) {
      setIsVisibleButtons(true);
    }
  }, [imagesWithoutDuplicate]);

  useEffect(() => {
    if (ref.current) {
      setWidthSlide(ref.current.offsetWidth);
    }
  }, [ref.current]);

  useEffect(() => {
    if (refList.current) {
      setGap(
        (Number(window.getComputedStyle(refList.current).getPropertyValue('gap').slice(0, -1)) /
          100) *
          refList.current.offsetWidth,
      );
    }
  }, [refList.current, widthSlide]);

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current) {
        setWidthSlide(ref.current.offsetWidth);
      }

      if (refList.current) {
        setGap(
          (Number(window.getComputedStyle(refList.current).getPropertyValue('gap').slice(0, -1)) /
            100) *
            refList.current.offsetWidth,
        );
      }
    });
  }, []);

  return (
    <div className={styles.imageSlider} ref={refSlider}>
      <div className={styles.imageSlider__discount}>-{currentItem.discountPercentage}%</div>
      <div className={styles.imageSlider__wrapperMain}>
        <img className={styles.imageSlider__main} src={mainImage} alt={currentItem.title} />
      </div>
      <div className={styles.imageSlider__wrapper}>
        <div
          className={`${styles.imageSlider__wrapperSlider} ${
            isVisibleButtons ? `${styles.imageSlider__wrapperSliderMargin}` : ''
          }`}
        >
          <ul
            className={styles.imageSlider__slider}
            style={{ left: `${slideNumber * -(widthSlide + gap)}px` }}
            ref={refList}
          >
            {imagesWithoutDuplicate.map((image, i) => (
              <li
                className={
                  mainImage !== image.url
                    ? styles.imageSlider__item
                    : `${styles.imageSlider__item} ${styles.imageSlider__itemActive}`
                }
                key={image.url}
                ref={ref}
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
        {isVisibleButtons && (
          <Buttons
            slideNumber={slideNumber}
            imagesWithoutDuplicate={imagesWithoutDuplicate}
            quantityVisibleSlides={quantityVisibleSlides}
            setSlideNumber={setSlideNumber}
          />
        )}
      </div>
    </div>
  );
}
