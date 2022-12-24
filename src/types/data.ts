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
export interface Promocods {
  name: string;
  discount: number;
}
