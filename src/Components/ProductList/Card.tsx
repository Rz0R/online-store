import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addCartItem, dropCartItem } from '../../store/reducers/cartState';
import SimpleCard from './SimpleCard';
import TileCard from './TileCard';
import { CardView } from '../../const/const';
import { Item } from '../../types/data';

type CardProps = {
  item: Item;
  cardView: CardView;
};

function Card({ item, cardView }: CardProps) {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.CART);
  const isItemInCart = cartItems.some((cartItem) => item.id === cartItem.id);

  const onBuyButtonClick = () =>
    isItemInCart ? dispatch(dropCartItem(item.id)) : dispatch(addCartItem(item));

  switch (String(cardView)) {
    case CardView.tile:
      return (
        <TileCard item={item} isItemInCart={isItemInCart} onBuyButtonClick={onBuyButtonClick} />
      );
    default:
      return (
        <SimpleCard item={item} isItemInCart={isItemInCart} onBuyButtonClick={onBuyButtonClick} />
      );
  }
}

export default Card;
