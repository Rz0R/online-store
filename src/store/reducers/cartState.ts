import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/const';
import { Item } from '../../types/data';
import { CartState } from '../../types/state';

export const initialState: CartState = {
  cartItemQuantaty: 0,
  totalPrice: 0,
  cartItems: [],
};

export const cartStateSlice = createSlice({
  name: NameSpace.cart,
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === newItem.id);
      if (cartItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === newItem.id ? { ...item, quantaty: item.quantaty + 1 } : item,
        );
      } else {
        state.cartItems = [...state.cartItems, { ...newItem, quantaty: 1 }];
      }
      state.cartItemQuantaty = state.cartItems.reduce((sum, item) => sum + item.quantaty, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantaty, 0);
    },
    removeItemCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.cartItems.find((item) => item.id === id)?.quantaty === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantaty: item.quantaty - 1 } : item,
        );
      }
      state.cartItemQuantaty = state.cartItems.reduce((sum, item) => sum + item.quantaty, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantaty, 0);
    },
    dropItemCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItemQuantaty = state.cartItems.reduce((sum, item) => sum + item.quantaty, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantaty, 0);
    },
  },
});

export const { addCartItem, removeItemCart, dropItemCart } = cartStateSlice.actions;
export const cartState = cartStateSlice.reducer;
