import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { itemState } from './reducers/itemState';
import { cartState } from './reducers/cartState';
import { NameSpace } from '../const/const';
import listenerMiddleware from './middleware';

export const rootReducer = combineReducers({
  [NameSpace.items]: itemState,
  [NameSpace.cart]: cartState,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(listenerMiddleware.middleware),
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
