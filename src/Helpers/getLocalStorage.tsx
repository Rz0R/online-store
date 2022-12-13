import TempData from '../Interfaces/data';

export default function getLocalStorage(): TempData | null {
  try {
    const data: TempData | string = JSON.parse(
      localStorage.getItem('online-store-metalknock-rz0r') || '""',
    );
    if (typeof data === 'string') {
      throw new Error('LocalStorage is empty');
    }
    return data;
  } catch (e) {
    console.error(e);
  }
  return null;
}
