export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

export type CartItem = Item & {
  quantity: number;
};

export type Items = Item[];

export type CartItems = CartItem[];

export interface ResponseData {
  limit: number;
  products: Items;
  skip: number;
  total: number;
}

export type FilterData = {
  allItems: number;
  availableItems: number;
  id: string;
  name: string;
  isActive: boolean;
}[];

export type StateDualSliderData = {
  minValue: number;
  maxValue: number;
  minDataValue: number;
  maxDataValue: number;
  max: number;
};

export type DualSliderData = StateDualSliderData & {
  onInput: (minValue: number, maxValue: number) => void;
};

export interface Promocodes {
  name: string;
  discount: number;
  fullName: string;
}
