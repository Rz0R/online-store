import ViewSwitch from './ViewSwitch';
import { CardView } from '../../const/const';
import styles from './TopPanel.module.scss';

type TopPanelProps = {
  cardView: CardView;
  onViewSwitchChange: (viewMode: CardView) => void;
};

function TopPanel({ cardView, onViewSwitchChange }: TopPanelProps) {
  return (
    <div className={styles.topPanel}>
      <div>Sort</div>
      <div>Search</div>
      <ViewSwitch cardView={cardView} onViewSwitchChange={onViewSwitchChange} />
    </div>
  );
}

export default TopPanel;
