export const selectWaterData = (state) => state.water.waterData;
export const selectDailyData = (state) => state.water.dailyData;
export const selectWeeklyData = (state) => state.water.weeklyData;
export const selectMonthlyData = (state) => state.water.monthlyData;
export const selectTotalAmount = (state) => state.water.totalAmount;
export const selectTotalPercentage = (state) => state.water.totalPercentage;
export const selectCurrentDate = (state) => state.water.currentDate;
export const selectCurrentWeek = (state) => state.water.currentWeek;
export const selectCurrentMonth = (state) => state.water.currentMonth;
export const selectCurrentItem = (state) => state.water.currentItem;
export const selectRefetchTrigger = (state) => state.water.refetchTrigger;
export const selectIsLoading = (state) => state.water.isLoading;
export const selectIsLoadingDaily = (state) => state.water.isLoadingDaily;
export const selectIsLoadingWeekly = (state) => state.water.isLoadingWeekly;
export const selectIsLoadingMonthly = (state) => state.water.isLoadingMonthly;
export const selectIsError = (state) => state.water.isError;
