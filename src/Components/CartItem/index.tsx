import { useAppDispatch } from '../../hooks/redux';
import { addCartItem, removeCartItem } from '../../store/reducers/cartState';
import { CartItem } from '../../types/data';
import styles from './CartItem.module.scss';

interface CartItemProps {
  className: string;
  item: CartItem;
  indexOfFirstCartItem: number;
  index: number;
}

export default function CartItemComp({
  className,
  item,
  indexOfFirstCartItem,
  index,
}: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleIncQuantity = () => {
    if (item.quantity < item.stock) {
      dispatch(addCartItem(item));
    }
  };

  const handleDecQuantity = () => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <div className={`${styles.item} ${className}`}>
      <div>{indexOfFirstCartItem + 1 + index}</div>
      <img className={styles.item__image} src={item.images[0]} alt={item.title} />
      <h3 className={styles.item__title}>{item.title}</h3>
      <div className={styles.price}>
        <div className={styles.price__inner}>
          <div className={styles.price__quantity}>{item.quantity}</div>
          <span className={styles.price__multi}>x</span>
          <div className={styles.price__priceOne}>€{item.price}</div>
        </div>
        <div className={styles.price__totalPrice}>€{Math.floor(item.price * item.quantity)}</div>
      </div>
      <div className={styles.countButtons}>
        <button className={styles.countButtons__dec} type="button" onClick={handleDecQuantity}>
          -
        </button>
        <div className={styles.countButtons__quantity}>{item.quantity}</div>
        <button className={styles.countButtons__inc} type="button" onClick={handleIncQuantity}>
          +
        </button>
      </div>
      <div className={styles.stock}>На складе: {item.stock} шт.</div>
    </div>
  );
}
