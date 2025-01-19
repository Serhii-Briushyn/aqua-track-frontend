import { createSlice } from "@reduxjs/toolkit";
import {
  createWaterOperation,
  updateWaterOperation,
  deleteWaterOperation,
  getDailyWaterOperation,
  getMonthlyWaterOperation,
} from "./operations";

const initialState = {
  waterData: [],
  dailyData: null,
  monthlyData: [],
  selectedDate: new Date().toISOString(),
  totalAmount: 0,
  totalPercentage: 0,
  isLoading: false,
  isError: null,
};

const calculateTotalPercentage = (waterData, totalAmount) => {
  const lastWaterData = waterData[waterData.length - 1];
  const norm = lastWaterData?.norm;

  if (norm) {
    return Math.min((totalAmount / norm) * 100, 100);
  }
  return 0; // Якщо norm відсутня
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
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData.push(action.payload.data);

        const totalAmount = state.waterData.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        state.totalAmount = totalAmount;
        state.totalPercentage = calculateTotalPercentage(
          state.waterData,
          totalAmount
        );
      })
      .addCase(createWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

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

        const totalAmount = state.waterData.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        state.totalAmount = totalAmount;
        state.totalPercentage = calculateTotalPercentage(
          state.waterData,
          totalAmount
        );
      })
      .addCase(updateWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

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

        const totalAmount = state.waterData.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        state.totalAmount = totalAmount;
        state.totalPercentage = calculateTotalPercentage(
          state.waterData,
          totalAmount
        );
      })
      .addCase(deleteWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    builder
      .addCase(getDailyWaterOperation.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getDailyWaterOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyData = action.payload.data;
        state.totalAmount = action.payload.totalAmount;
        state.totalPercentage = action.payload.totalPercentage;
      })
      .addCase(getDailyWaterOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

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

export const { setCurrentItem, clearCurrentItem, setSelectedDate } =
  waterSlice.actions;
export const waterReducer = waterSlice.reducer;
