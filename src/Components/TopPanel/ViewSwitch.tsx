import { ChangeEvent } from 'react';
import { CardView } from '../../const/const';
import styles from './ViewSwitch.module.scss';

type ViewSwitchProps = {
  cardView: CardView;
  onViewSwitchChange: (cardView: CardView) => void;
};

function ViewSwitch({ cardView, onViewSwitchChange }: ViewSwitchProps) {
  const onChange = (evt: ChangeEvent<HTMLInputElement>) =>
    evt.currentTarget.value === CardView.tile
      ? onViewSwitchChange(CardView.tile)
      : onViewSwitchChange(CardView.simple);

  return (
    <div className={styles.viewSwitch}>
      <label htmlFor="mode-tile" className={styles.viewSwitch__radioBtn}>
        <input
          type="radio"
          name="view-mode"
          value={CardView.tile}
          id="mode-tile"
          checked={CardView.tile === cardView}
          onChange={onChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2.91 1.455c-.804 0-1.456.65-1.456 1.454v1.455c0 .804.652 1.455 1.455 1.455h1.455c.803 0 1.454-.651 1.454-1.455V2.91c0-.803-.65-1.454-1.454-1.454H2.909zM0 2.909A2.91 2.91 0 012.91 0h1.454a2.91 2.91 0 012.909 2.91v1.454a2.91 2.91 0 01-2.91 2.91H2.91A2.91 2.91 0 010 4.364V2.91zm11.636-1.454c-.803 0-1.454.65-1.454 1.454v1.455c0 .804.65 1.455 1.454 1.455h1.455c.803 0 1.455-.651 1.455-1.455V2.91c0-.803-.652-1.454-1.455-1.454h-1.455zM8.727 2.909A2.91 2.91 0 0111.637 0h1.454A2.91 2.91 0 0116 2.91v1.454a2.91 2.91 0 01-2.91 2.91h-1.454a2.91 2.91 0 01-2.909-2.91V2.91zM2.91 10.181c-.803 0-1.455.651-1.455 1.455v1.455c0 .803.652 1.455 1.455 1.455h1.455c.803 0-2.546-.652 1.454-1.455v-1.455c0-.804-.65-1.455-1.454-1.455H2.909zM0 11.636a2.91 2.91 0 012.91-2.91h1.454a2.91 2.91 0 012.909 2.91v1.455A2.91 2.91 0 014.363 16H2.91A2.91 2.91 0 010 13.09v-1.454zm11.636-1.455c-.803 0-1.454.651-1.454 1.455v1.455c0 .803.65 1.455 1.454 1.455h1.455c.803 0 1.455-.652 1.455-1.455v-1.455c0-.804-.652-1.455-1.455-1.455h-1.455zm-2.909 1.455a2.91 2.91 0 012.91-2.91h1.454A2.91 2.91 0 0116 11.636v1.455A2.91 2.91 0 0113.09 16h-1.454a2.91 2.91 0 01-2.909-2.91v-1.454z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <label htmlFor="mode-simple" className={styles.viewSwitch__radioBtn}>
        <input
          type="radio"
          name="view-mode"
          value={CardView.simple}
          id="mode-simple"
          checked={!(CardView.tile === cardView)}
          onChange={onChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2.91 1.455c-.804 0-1.456.65-1.456 1.454v1.455c0 .804.652 1.455 1.455 1.455H13c.803 0 1.455-.651 1.455-1.455V2.91c0-.803-.652-1.454-1.455-1.454H2.91zM0 2.909A2.91 2.91 0 012.91 0H13a2.91 2.91 0 012.91 2.91v1.454A2.91 2.91 0 0113 7.274H2.91A2.91 2.91 0 010 4.364V2.91zm2.91 7.272c-.804 0-1.456.651-1.456 1.455v1.455c0 .803.652 1.455 1.455 1.455H13c.803 0 1.455-.652 1.455-1.455v-1.455c0-.804-.652-1.455-1.455-1.455H2.91zM0 11.636a2.91 2.91 0 012.91-2.91H13a2.91 2.91 0 012.91 2.91v1.455A2.91 2.91 0 0113 16H2.91A2.91 2.91 0 010 13.09v-1.454z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}

export default ViewSwitch;
