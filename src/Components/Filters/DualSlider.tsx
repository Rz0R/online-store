import { useEffect, useRef } from 'react';
import styles from './DualSlider.module.scss';

const fillColor = (curValue1: number, curValue2: number, maxValue: number) => {
  const value1 = (curValue1 / maxValue) * 100;
  const value2 = (curValue2 / maxValue) * 100;

  return `linear-gradient(to right, #eee ${value1}% , #0bb648 ${value1}% , #0bb648 ${value2}%, #eee ${value2}%)`;
};

const MIN = 0;

type DualSliderProps = {
  name: string;
  minValue: number;
  maxValue: number;
  minDataValue: string;
  maxDataValue: string;
  max: number;
  onInput: (minValue: number, maxValue: number) => void;
};

function DualSlider({
  name,
  minValue,
  maxValue,
  minDataValue,
  maxDataValue,
  max,
  onInput,
}: DualSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.background = fillColor(minValue, maxValue, max);
    }
  }, [minValue, maxValue]);

  return (
    <div className={styles.dualSlider}>
      <h3 className={styles.dualSlider__name}>{name}</h3>
      <div className={styles.dualSlider__values}>
        <div>{minDataValue}</div>⟷<div>{maxDataValue}</div>
      </div>

      <div className={styles.dualSlider__trackWrapper}>
        <div ref={trackRef} className={styles.dualSlider__sliderTrack} />
        <input
          type="range"
          min={MIN}
          max={max}
          value={minValue}
          className={styles.dualSlider__input}
          onInput={(evt) => {
            const value = Math.min(+evt.currentTarget.value, maxValue);
            onInput(value, maxValue);
          }}
        />
        <input
          type="range"
          min={MIN}
          max={max}
          value={maxValue}
          className={styles.dualSlider__input}
          onInput={(evt) => {
            const value = Math.max(+evt.currentTarget.value, minValue);
            onInput(minValue, value);
          }}
        />
      </div>
    </div>
  );
}

export default DualSlider;
