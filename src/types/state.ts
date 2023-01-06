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
  categories: string[];
  brands: string[];
  prices: number[];
  stocks: number[];
  isLoading: boolean;
  error: string;
};

export type ModalState = {
  isOpen: boolean;
};

export type FilterState = {
  id: string;
  name: string;
  isActive: boolean;
}[];
