export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectUserCount = (state) => state.user.userCount;
export const selectIsUserFetched = (state) => state.user.isUserFetched;
