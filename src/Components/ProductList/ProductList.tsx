import styles from './ProductList.module.scss';
import Card from './Card';
import { Items } from '../../types/data';
import { CardView } from '../../const/const';

type ProductListProps = {
  items: Items;
  cardView: CardView;
};

function ProductList({ items, cardView }: ProductListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.productList}>
        <div className={styles.productList__notFound}>No products found 😏</div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.productList} ${
        cardView === CardView.tile ? styles.viewTile : styles.viewSimple
      }`}
    >
      {items.map((item) => (
        <Card key={item.id} cardView={cardView} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
