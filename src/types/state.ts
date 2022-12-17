import { Items, CartItems } from './data';

export type CartState = {
  cartItemQuantity: number;
  totalPrice: number;
  cartItems: CartItems;
};

export type ItemState = {
  items: Items;
  isLoading: boolean;
  error: string;
};
