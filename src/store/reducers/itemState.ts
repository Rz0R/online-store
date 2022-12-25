import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/const';
import { Items } from '../../types/data';
import { ItemState } from '../../types/state';

const initialState: ItemState = {
  items: [],
  categories: [],
  brands: [],
  isLoading: true,
  error: '',
};

export const itemStateSlice = createSlice({
  name: NameSpace.items,
  initialState,
  reducers: {
    itemsLoading(state) {
      state.isLoading = true;
      state.error = '';
    },
    itemsLoadingSuccess(state, action: PayloadAction<Items>) {
      state.isLoading = false;
      state.error = '';
      state.items = action.payload;
    },
    itemsLoadingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    categoriesLoadingSuccess(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    brandsLoadingSuccess(state, action: PayloadAction<string[]>) {
      state.brands = action.payload;
    },
  },
});

export const {
  itemsLoading,
  itemsLoadingSuccess,
  itemsLoadingError,
  categoriesLoadingSuccess,
  brandsLoadingSuccess,
} = itemStateSlice.actions;
export const itemState = itemStateSlice.reducer;
