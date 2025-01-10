import { createSlice } from "@reduxjs/toolkit";
import { deleteWater } from "../water/operations.js";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "water",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      // -------------- Delete water --------------
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = slice.reducer;
