import { Items, CartItems, Promocodes } from './data';

export type CartState = {
  cartItemQuantity: number;
  totalPrice: number;
  cartItems: CartItems;
  promocodes: Array<Promocodes>;
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
