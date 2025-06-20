import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { waterReducer } from "./water/slice";

const authPersistConfig = {
  key: "user",
  storage,
  whitelist: ["isLoggedIn"],
};

const waterPersistConfig = {
  key: "water",
  version: 1,
  storage,
  whitelist: [
    "dailyData",
    "weeklyData",
    "monthlyData",
    "totalAmount",
    "totalPercentage",
  ],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(authPersistConfig, authReducer),
    water: persistReducer(waterPersistConfig, waterReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
