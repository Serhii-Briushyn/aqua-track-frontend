import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaTrackApi } from "../../services/apiClient";
import { withRefreshRetry } from "../../utils/withRefreshRetry";

// -------------------- Error Handling Function --------------------

const handleApiError = (error, thunkAPI) => {
  if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 400) {
      return thunkAPI.rejectWithValue("BadRequestError");
    } else if (statusCode === 401) {
      return thunkAPI.rejectWithValue("UnauthorizedError");
    } else if (statusCode === 404) {
      return thunkAPI.rejectWithValue("WaterNotFound");
    } else if (statusCode === 500) {
      return thunkAPI.rejectWithValue("SomethingWentWrong");
    }
  }

  return thunkAPI.rejectWithValue("defaultError");
};

// -------------------- Create Water --------------------

export const createWaterOperation = createAsyncThunk(
  "water/create",
  async (data, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.post("/water", data),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Update Water --------------------

export const updateWaterOperation = createAsyncThunk(
  "water/update",
  async ({ id, data }, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.patch(`/water/${id}`, data),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Delete Water --------------------

export const deleteWaterOperation = createAsyncThunk(
  "water/delete",
  async (id, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.delete(`/water/${id}`),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Get Daily Water --------------------

export const getDailyWaterOperation = createAsyncThunk(
  "water/getDaily",
  async ({ date }, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.get("/water/daily", { params: { date } }),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Get Weekly Water --------------------

export const getWeeklyWaterOperation = createAsyncThunk(
  "water/getWeekly",
  async ({ startDate }, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.get("/water/weekly", { params: { startDate } }),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Get Monthly Water --------------------

export const getMonthlyWaterOperation = createAsyncThunk(
  "water/getMonthly",
  async ({ month, year }, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.get("/water/monthly", { params: { month, year } }),
      thunkAPI,
      handleApiError
    );
  }
);
