import { keyLocalStorage } from '../const/const';
import { TempCartData } from '../types/dataTemp';

export interface TempGetLocalStorage {
  cartItems: Array<TempCartData>;
}

export function getLocalStorage(): TempGetLocalStorage {
  const data: TempGetLocalStorage | string = JSON.parse(
    localStorage.getItem(keyLocalStorage) || '""',
  );
  if (typeof data === 'string') {
    throw new Error('LocalStorage is empty');
  }
  return data;
}
