import { TempCartData } from '../types/data';

export interface TempGetLocalStorage {
  cartItems: Array<TempCartData>;
}

export function getLocalStorage(): TempGetLocalStorage {
  const data: TempGetLocalStorage | string = JSON.parse(
    localStorage.getItem('online-store-metalknock-rz0r') || '""',
  );
  if (typeof data === 'string') {
    throw new Error('LocalStorage is empty');
  }
  return data;
}
