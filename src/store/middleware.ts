import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { keyLocalStorage } from '../const/const';
import { addCartItem, removeCartItem, dropCartItem } from './reducers/cartState';
import type { RootState } from './rootReducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addCartItem, removeCartItem, dropCartItem),
  effect: (_, listenerApi) =>
    localStorage.setItem(
      keyLocalStorage,
      JSON.stringify((listenerApi.getState() as RootState).CART),
    ),
});

export default listenerMiddleware;
