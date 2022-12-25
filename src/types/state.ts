import { Items, CartItems } from './data';

export type CartState = {
  cartItemQuantity: number;
  totalPrice: number;
  cartItems: CartItems;
};

export type ItemState = {
  items: Items;
  categories: string[];
  brands: string[];
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
