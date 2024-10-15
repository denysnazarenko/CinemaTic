import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isRegister: true
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.isRegister = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
    }
  }
});

const { actions, reducer } = modalSlice;

export default reducer;
export const {
  openModal,
  closeModal
} = actions;