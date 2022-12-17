// import styles from './ProductList.module.scss';
import SimpleCard from './SimpleCard';
import { Items } from '../../types/data';

type ProductListProps = {
  items: Items;
};

function ProductList({ items }: ProductListProps) {
  return (
    <div>
      {items.map((item) => (
        <SimpleCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
