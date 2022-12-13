import TempData from '../Interfaces/data';

interface SetLocalStorageProps {
  cartItems: Array<TempData>;
}

export default function setLocalStorage(data: SetLocalStorageProps) {
  localStorage.setItem('online-store-metalknock-rz0r', JSON.stringify(data));
}
