import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { itemState } from './reducers/itemState';
import { cartState } from './reducers/cartState';
import { NameSpace } from '../const/const';

export const rootReducer = combineReducers({
  [NameSpace.items]: itemState,
  [NameSpace.cart]: cartState,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
