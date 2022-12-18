import styles from './ProductList.module.scss';
// import SimpleCard from './SimpleCard';
import TileCard from './TileCard';
import { Items } from '../../types/data';

type ProductListProps = {
  items: Items;
};

enum View {
  simple = 'SIMPLE',
  tile = 'TILE',
}

const view: View = View.tile;

function ProductList({ items }: ProductListProps) {
  return (
    <div className={`${styles.prodictList} ${view === View.tile ? styles.viewTile : ''}`}>
      {items.map((item) => (
        // <SimpleCard key={item.id} item={item} />
        <TileCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
