//src/redux/water/selectors.js
export const selectWaterData = (state) => state.water.waterData;
export const selectDailyData = (state) => state.water.dailyData;
export const selectMonthlyData = (state) => state.water.monthlyData;
export const selectIsLoading = (state) => state.water.isLoading;
export const selectIsError = (state) => state.water.isError;
export const selectCurrentItem = (state) => state.contacts.currentItem;
