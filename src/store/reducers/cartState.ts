import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/const';
import { CartState } from '../../types/state';

export const initialState: CartState = {
  itemQuantity: 0,
};

export const cartStateSlice = createSlice({
  name: NameSpace.cart,
  initialState,
  reducers: {
    setItemQuantity(state, action: PayloadAction<number>) {
      state.itemQuantity = action.payload;
    },
  },
});

export const { setItemQuantity } = cartStateSlice.actions;
export const cartState = cartStateSlice.reducer;
