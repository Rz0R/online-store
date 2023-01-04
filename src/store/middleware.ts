import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { keyLocalStorage } from '../const/const';
import {
  addCartItem,
  removeCartItem,
  dropCartItem,
  clearCart,
  addPromocode,
  removePromocode,
} from './reducers/cartState';
import type { RootState } from './rootReducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    addCartItem,
    removeCartItem,
    dropCartItem,
    clearCart,
    addPromocode,
    removePromocode,
  ),
  effect: (_, listenerApi) =>
    localStorage.setItem(
      keyLocalStorage,
      JSON.stringify((listenerApi.getState() as RootState).CART),
    ),
});

export default listenerMiddleware;
