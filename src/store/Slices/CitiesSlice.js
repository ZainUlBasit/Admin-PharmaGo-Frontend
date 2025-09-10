import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCitiesApi } from "../../ApiRequests";

export const fetchCities = createAsyncThunk("fetch/Cities", async () => {
  try {
    const response = await GetCitiesApi();
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const CitiesSlice = createSlice({
  name: "cities-data",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CitiesSlice.reducer;
