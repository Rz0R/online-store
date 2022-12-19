import styles from './ProductList.module.scss';
import Card from './Card';
import { Items } from '../../types/data';
import { CardView } from '../../const/const';

type ProductListProps = {
  items: Items;
};

const cardView: CardView = CardView.simple;

function ProductList({ items }: ProductListProps) {
  return (
    <div
      className={`${styles.prodictList} ${
        cardView === CardView.tile ? styles.viewTile : styles.viewSimple
      }`}
    >
      {items.map((item) => (
        <Card cardView={cardView} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
