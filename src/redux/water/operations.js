//src/redux/water/operation.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaTrackApi } from "../../services/apiClient";

// -------------------- Error Handling Function --------------------

const handleApiError = (error, thunkAPI) => {
    if (error.response) {
        const backendMessage =
            error.response.data?.message || 'An error occurred. Please try again.';
        return thunkAPI.rejectWithValue(backendMessage);
    }

    return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
};

// -------------------- Create Water --------------------

export const createWaterOperation = createAsyncThunk('water/create',
    async (data, thunkAPI) => {
        try {
            const response = await aquaTrackApi.post('/water', data);
            return response.data;
        } catch (error) {
            return handleApiError(error, thunkAPI);
        }
    }
);

// -------------------- Update Water --------------------

export const updateWaterOperation = createAsyncThunk(
    'water/update',
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await aquaTrackApi.put(`/water/${id}`, data)
            return response.data;
        } catch (error) {
            return handleApiError(error, thunkAPI);
        }
    }
);

// -------------------- Delete Water --------------------

export const deleteWaterOperation = createAsyncThunk(
    'water/delete',
    async (id, thunkAPI) => {
        try {
            await aquaTrackApi.delete(`/water/${id}`);
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
            const response = await aquaTrackApi.get("/water/daily", {
                params: { date },
            });
            return response.data;
        } catch (error) {
            return handleApiError(error, thunkAPI);
        }
    }
);

// -------------------- Get Monthly Water --------------------

export const getMonthlyWaterOperation = createAsyncThunk(
    'water/getMonthly',
    async ({ month, year }, thunkAPI) => {
        try {
            const response = await aquaTrackApi.get('/water/monthly', {
                params: { month, year },
            });
            return response.data;
        } catch (error) {
            return handleApiError(error, thunkAPI);
        }
    }
);