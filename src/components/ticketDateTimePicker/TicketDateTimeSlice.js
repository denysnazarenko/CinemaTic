import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDay: null,
  selectedTime: null,
  price: null,
}

const ticketDateTimeSlice = createSlice({
  name: 'ticketDateTime',
  initialState,
  reducers: {
    setSelectedDay(state, action) {
      state.selectedDay = action.payload.dayWithMonth;
      state.price = action.payload.price;
    },
    setSelectedTime(state, action) {
      state.selectedTime = action.payload;
    },
    resetSelection(state) {
      state.selectedDay = null;
      state.selectedTime = null;
      state.price = null;
    }
  }
});

const { reducer, actions } = ticketDateTimeSlice;

export default reducer;
export const {
  setSelectedDay,
  setSelectedTime,
  resetSelection
} = actions;