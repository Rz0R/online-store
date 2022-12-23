import ViewSwitch from './ViewSwitch';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import { CardView, SortOptionValues } from '../../const/const';
import styles from './TopPanel.module.scss';

type TopPanelProps = {
  cardView: CardView;
  onViewSwitchChange: (viewMode: CardView) => void;
  sortValue: SortOptionValues;
  onSortValueChange: (value: SortOptionValues) => void;
  // searchValue: string;
  onSearchValueChange: (value: string) => void;
};

function TopPanel({
  cardView,
  onViewSwitchChange,
  sortValue,
  onSortValueChange,
  onSearchValueChange,
}: TopPanelProps) {
  return (
    <div className={styles.topPanel}>
      <SortOptions sortValue={sortValue} onSortValueChange={onSortValueChange} />
      <SearchBar onSearchValueChange={onSearchValueChange} />
      <ViewSwitch cardView={cardView} onViewSwitchChange={onViewSwitchChange} />
    </div>
  );
}

export default TopPanel;
