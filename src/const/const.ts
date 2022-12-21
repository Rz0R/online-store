export enum NameSpace {
  cart = 'CART',
  items = 'ITEMS',
}

export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum CardView {
  simple = 'SIMPLE',
  tile = 'TILE',
}

export enum SortOptionValues {
  sortTitle = 'sort-title',
  priceASC = 'price-asc',
  priceDESC = 'price-desc',
  raitingASC = 'raiting-asc',
  raitingDESC = 'raiting-desc',
}

export const URL = 'https://dummyjson.com/products?limit=100';

export const keyLocalStorage = 'online-store-metalknock-rz0r';
