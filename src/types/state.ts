import { Items } from './data';

export type CartState = {
  itemQuantity: number;
};

export type ItemState = {
  items: Items;
  isLoading: boolean;
  error: string;
};
