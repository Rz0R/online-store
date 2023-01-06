import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { ModalState } from '../../types/state';

const initialState: ModalState = {
  isOpen: false,
};

export const modalStateSlice = createSlice({
  name: NameSpace.modal,
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalStateSlice.actions;
export const modalState = modalStateSlice.reducer;
