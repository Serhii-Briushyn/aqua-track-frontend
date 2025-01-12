import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "";

// -------------- Delete water --------------

export const deleteWater = createAsyncThunk(
  "deleteWaterThunk",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/water/${id}`);
      return data.id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
