import { Items, CartItems, Promocods } from './data';

export type CartState = {
  cartItemQuantity: number;
  totalPrice: number;
  cartItems: CartItems;
  promocods: Array<Promocods>;
  totalDiscount: number;
  discountedTotalPrice: number;
};

export type ItemState = {
  items: Items;
  isLoading: boolean;
  error: string;
};

export type ModalState = {
  isOpen: boolean;
};
