import { keyLocalStorage } from '../const/const';
import { TempCartData } from '../types/dataTemp';

export interface SetLocalStorageProps {
  cartItems: Array<TempCartData>;
}

export default function setLocalStorage(data: SetLocalStorageProps) {
  localStorage.setItem(keyLocalStorage, JSON.stringify(data));
}
