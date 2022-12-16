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

export interface CartItem {
  id: number;
  price: number;
  quantaty: number;
}

export type Items = Item[];

export type CartItems = CartItem[];

export interface ResponseData {
  limit: number;
  products: Items;
  skip: number;
  total: number;
}
