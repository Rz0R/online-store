import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, keyLocalStorage } from '../../const/const';
import { Item, Promocods } from '../../types/data';
import { CartState } from '../../types/state';

const localCartState: CartState = JSON.parse(localStorage.getItem(keyLocalStorage) || 'null');

export const initialState: CartState = {
  cartItemQuantity: localCartState ? localCartState.cartItemQuantity : 0,
  totalPrice: localCartState ? localCartState.totalPrice : 0,
  cartItems: localCartState ? localCartState.cartItems : [],
  promocods: localCartState ? localCartState.promocods : [],
  totalDiscount: localCartState ? localCartState.totalDiscount : 0,
  discountedTotalPrice: localCartState ? localCartState.discountedTotalPrice : 0,
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
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
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
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
    dropCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartItemQuantity = 0;
      state.totalPrice = 0;
      state.promocods = [];
      state.totalDiscount = 0;
      state.discountedTotalPrice = 0;
    },
    addPromocode(state, action: PayloadAction<Promocods>) {
      if (!state.promocods.find((promocode) => promocode.name === action.payload.name)) {
        state.promocods = [...state.promocods, action.payload];
        const sumDiscount = parseFloat(
          state.promocods.reduce((sum, promocod) => sum + promocod.discount, 0).toFixed(2),
        );
        state.totalDiscount = sumDiscount > 1 ? 1 : sumDiscount;
        state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
      }
    },
    removePromocode(state, action: PayloadAction<string>) {
      state.promocods = state.promocods.filter((promocod) => promocod.name !== action.payload);
      const sumDiscount = parseFloat(
        state.promocods.reduce((sum, promocod) => sum + promocod.discount, 0).toFixed(2),
      );
      state.totalDiscount = sumDiscount > 1 ? 1 : sumDiscount;
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  dropCartItem,
  clearCart,
  addPromocode,
  removePromocode,
} = cartStateSlice.actions;
export const cartState = cartStateSlice.reducer;
