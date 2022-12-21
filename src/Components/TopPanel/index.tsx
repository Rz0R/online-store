import ViewSwitch from './ViewSwitch';
import SortOptions from './SortOptions';
import { CardView, SortOptionValues } from '../../const/const';
import styles from './TopPanel.module.scss';

type TopPanelProps = {
  cardView: CardView;
  onViewSwitchChange: (viewMode: CardView) => void;
  sortValue: SortOptionValues;
  onSortValueChange: (value: SortOptionValues) => void;
};

function TopPanel({ cardView, onViewSwitchChange, sortValue, onSortValueChange }: TopPanelProps) {
  return (
    <div className={styles.topPanel}>
      <SortOptions sortValue={sortValue} onSortValueChange={onSortValueChange} />
      <div>Search</div>
      <ViewSwitch cardView={cardView} onViewSwitchChange={onViewSwitchChange} />
    </div>
  );
}

export default TopPanel;
