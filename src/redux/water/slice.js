import { createSlice } from "@reduxjs/toolkit";
import {
  createWaterOperation,
  updateWaterOperation,
  deleteWaterOperation,
  getDailyWaterOperation,
  getMonthlyWaterOperation,
  getWeeklyWaterOperation,
} from "./operations.js";
import { logout } from "../auth/operations.js";

const initialState = {
  dailyData: [],
  weeklyData: [],
  monthlyData: [],
  totalAmount: null,
  totalPercentage: null,
  currentDate: new Date().toISOString().split("T")[0],
  currentWeek: {
    startDate: new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
    ).toISOString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
    ).toISOString(),
  },
  currentMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  currentItem: null,
  refetchTrigger: 0,
  isLoading: false,
  isLoadingDaily: false,
  isLoadingWeekly: false,
  isLoadingMonthly: false,
  isError: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    setCurrentWeek(state, action) {
      state.currentWeek = action.payload;
    },
    setCurrentMonth(state, action) {
      state.currentMonth = action.payload;
    },

    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    triggerRefetch(state) {
      state.refetchTrigger += 1;
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
        state.dailyData.push(action.payload.data);
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
        const index = state.dailyData.findIndex(
          (item) => item.id === action.payload.data.id
        );
        if (index !== -1) {
          state.dailyData[index] = action.payload.data;
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
        state.dailyData = state.dailyData.filter(
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
        state.isLoadingDaily = true;
        state.isError = null;
      })
      .addCase(getDailyWaterOperation.fulfilled, (state, action) => {
        state.isLoadingDaily = false;
        state.dailyData = action.payload.data;
        state.totalAmount = action.payload.totalAmount;
        state.totalPercentage = action.payload.totalPercentage;
      })
      .addCase(getDailyWaterOperation.rejected, (state, action) => {
        state.isLoadingDaily = false;
        state.isError = action.payload;
      });
    // -------------------- Get Weekly Water --------------------
    builder
      .addCase(getWeeklyWaterOperation.pending, (state) => {
        state.isLoadingWeekly = true;
        state.isError = null;
      })
      .addCase(getWeeklyWaterOperation.fulfilled, (state, action) => {
        state.isLoadingWeekly = false;
        state.weeklyData = action.payload.data;
      })
      .addCase(getWeeklyWaterOperation.rejected, (state, action) => {
        state.isLoadingWeekly = false;
        state.isError = action.payload;
      });
    // -------------------- Get Monthly Water --------------------
    builder
      .addCase(getMonthlyWaterOperation.pending, (state) => {
        state.isLoadingMonthly = true;
        state.isError = null;
      })
      .addCase(getMonthlyWaterOperation.fulfilled, (state, action) => {
        state.isLoadingMonthly = false;
        state.monthlyData = action.payload.data;
      })
      .addCase(getMonthlyWaterOperation.rejected, (state, action) => {
        state.isLoadingMonthly = false;
        state.isError = action.payload;
      });
    // -------------------- Logout operation --------------------
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
  },
});

export const {
  setCurrentDate,
  setCurrentWeek,
  setCurrentMonth,
  setCurrentItem,
  clearCurrentItem,
  triggerRefetch,
} = waterSlice.actions;

export const waterReducer = waterSlice.reducer;
