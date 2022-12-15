import { TempCartData } from '../types/data';

export interface SetLocalStorageProps {
  cartItems: Array<TempCartData>;
}

export default function setLocalStorage(data: SetLocalStorageProps) {
  localStorage.setItem('online-store-metalknock-rz0r', JSON.stringify(data));
}
