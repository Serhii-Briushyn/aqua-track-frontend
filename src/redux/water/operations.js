import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaTrackApi } from "../../services/apiClient";
import { authRequest } from "../../utils/authRequest";

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
    try {
      const response = await authRequest(
        () => aquaTrackApi.post("/water", data),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Update Water --------------------

export const updateWaterOperation = createAsyncThunk(
  "water/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await authRequest(
        () => aquaTrackApi.patch(`/water/${id}`, data),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Delete Water --------------------

export const deleteWaterOperation = createAsyncThunk(
  "water/delete",
  async (id, thunkAPI) => {
    try {
      await authRequest(() => aquaTrackApi.delete(`/water/${id}`), thunkAPI);
      return id;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Get Daily Water --------------------

export const getDailyWaterOperation = createAsyncThunk(
  "water/getDaily",
  async ({ date }, thunkAPI) => {
    try {
      const response = await authRequest(
        () => aquaTrackApi.get("/water/daily", { params: { date } }),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Get Weekly Water --------------------

export const getWeeklyWaterOperation = createAsyncThunk(
  "water/getWeekly",
  async ({ startDate }, thunkAPI) => {
    try {
      const response = await authRequest(
        () => aquaTrackApi.get("/water/weekly", { params: { startDate } }),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Get Monthly Water --------------------

export const getMonthlyWaterOperation = createAsyncThunk(
  "water/getMonthly",
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await authRequest(
        () => aquaTrackApi.get("/water/monthly", { params: { month, year } }),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);
