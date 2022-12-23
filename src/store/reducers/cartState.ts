import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, keyLocalStorage } from '../../const/const';
import { Item } from '../../types/data';
import { CartState } from '../../types/state';

const localCartState: CartState = JSON.parse(localStorage.getItem(keyLocalStorage) || 'null');

export const initialState: CartState = {
  cartItemQuantity: localCartState ? localCartState.cartItemQuantity : 0,
  totalPrice: localCartState ? localCartState.totalPrice : 0,
  cartItems: localCartState ? localCartState.cartItems : [],
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
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        state.cartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
      }
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      localStorage.setItem(keyLocalStorage, JSON.stringify(state.cartItems.map((item) => item)));
    },
    removeCartItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.cartItems.find((item) => item.id === id)?.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    dropCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartItemQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addCartItem, removeCartItem, dropCartItem, clearCart } = cartStateSlice.actions;
export const cartState = cartStateSlice.reducer;
