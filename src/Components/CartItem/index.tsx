import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { addCartItem, removeCartItem } from '../../store/reducers/cartState';
import { CartItem } from '../../types/data';
import Minus from '../Loader/minus';
import Plus from '../Loader/plus';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItem;
  indexOfFirstCartItem: number;
  index: number;
}

export default function CartItemComp({ item, indexOfFirstCartItem, index }: CartItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleIncQuantity = () => {
    if (item.quantity < item.stock) {
      dispatch(addCartItem(item));
    }
  };

  const handleDecQuantity = () => {
    dispatch(removeCartItem(item.id));
  };

  const handleClickItem = (id: number) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className={`${styles.item}`}>
      <div className={styles.item__wrapper}>
        <div className={styles.item__index}>{indexOfFirstCartItem + 1 + index}</div>
        <button
          className={styles.item__image}
          type="button"
          onClick={() => handleClickItem(item.id)}
        >
          <img className={styles.item__image} src={item.thumbnail} alt={item.title} />
        </button>
        <div className={styles.item__descriptions}>
          <h3 className={styles.item__title}>
            <button
              className={styles.item__title}
              type="button"
              onClick={() => handleClickItem(item.id)}
            >
              {item.title}
            </button>
          </h3>
          <div className={styles.item__dataWrapper}>
            Category:
            <span className={styles.item__data}>{item.category}</span>
          </div>
          <div className={styles.item__dataWrapper}>
            Brand:
            <span className={styles.item__data}>{item.brand}</span>
          </div>
          <div className={styles.item__dataWrapper}>
            Stock:
            <span className={styles.item__data}>{item.stock}</span>
          </div>
          <div className={styles.item__dataWrapper}>
            Rating:
            <span className={styles.item__data}>{item.rating}</span>
          </div>
          <div className={styles.item__dataWrapper}>
            Discount:
            <span className={styles.item__data}>{item.discountPercentage}%</span>
          </div>
          <div className={styles.item__dataWrapper}>
            Description:
            <span className={styles.item__data}>{item.description}</span>
          </div>
        </div>
      </div>

      <div className={styles.item__wrapper}>
        <div className={styles.price}>
          <div className={styles.price__inner}>
            <div className={styles.price__quantity}>{item.quantity}</div>
            <span className={styles.price__multi}>x</span>
            <div className={styles.price__priceOne}>€{item.price}</div>
          </div>
          <div className={styles.price__totalPrice}>€{Math.floor(item.price * item.quantity)}</div>
        </div>
        <div className={styles.countButtons}>
          <div className={styles.countButtons__wrapper}>
            <button className={styles.countButtons__dec} type="button" onClick={handleDecQuantity}>
              <Minus className={styles.countButtons__decIcon} />
            </button>
            <div className={styles.countButtons__quantity}>{item.quantity}</div>
            <button
              className={
                item.quantity < item.stock
                  ? styles.countButtons__inc
                  : styles.countButtons__incDisable
              }
              type="button"
              onClick={handleIncQuantity}
            >
              <Plus className={styles.countButtons__incIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
