import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { keyLocalStorage } from '../const/const';
import { addCartItem, removeItemCart, dropItemCart } from './reducers/cartState';
import type { RootState } from './rootReducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addCartItem, removeItemCart, dropItemCart),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      keyLocalStorage,
      JSON.stringify((listenerApi.getState() as RootState).CART),
    ),
});

export default listenerMiddleware;
