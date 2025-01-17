//src/redux/water/slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createWaterOperation,
  updateWaterOperation,
  deleteWaterOperation,
  getDailyWaterOperation,
  getMonthlyWaterOperation,
} from "./operations.js";

const initialState = {
  waterData: [],
  normaWater: 0,
  totalWater: 0,
  totalAmount: 0,
  dailyData: null,
  monthlyData: [],
  isLoading: false,
  isError: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setNormaWater: (state, action) => {
      state.normaWater = action.payload;
    },
    clearNormaWater: (state) => {
      state.normaWater = 0;
    },
    setWaterData: (state, action) => {
      state.waterData.push(action.payload);
    },

    clearWaterData: (state) => {
      state.waterData = [];
    },
    addWaterAmount: (state, action) => {
      console.log("Before adding water:", state.totalWater);
      state.totalWater += action.payload;
      console.log("After adding water:", state.totalWater);
    },

    clearTotalWater: (state) => {
      state.totalWater = 0; // Очищаємо загальну кількість
    },
    resetTotalAmount: (state) => {
      state.totalAmount = 0; // Очищаємо накопичену кількість води
    },
  },
  extraReducers: (builder) => {
    // -------------------- Create Water --------------------
    builder
      .addCase(createWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData.push(action.payload.data);
      })
      .addCase(createWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Update Water --------------------
    builder
      .addCase(updateWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.waterData.findIndex(
          (item) => item.id === action.payload.data.id
        );
        if (index !== -1) {
          state.waterData[index] = action.payload.data;
        }
      })
      .addCase(updateWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // -------------------- Delete Water --------------------
    builder
      .addCase(deleteWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = state.waterData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // -------------------- Get Daily Water --------------------
    builder
      .addCase(getDailyWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getDailyWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyData = action.payload.data;
      })
      .addCase(getDailyWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // -------------------- Get Monthly Water --------------------
    builder
      .addCase(getMonthlyWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMonthlyWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlyData = action.payload.data;
      })
      .addCase(getMonthlyWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {
  setCurrentItem,
  clearCurrentItem,
  setNormaWater,
  clearNormaWater,
  setWaterData,
  clearWaterData,
  addWaterAmount,
  clearTotalWater,
  resetTotalAmount,
} = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
