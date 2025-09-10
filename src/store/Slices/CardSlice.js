import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllProductApi,
  GetCardDataApi,
  GetCartApi,
} from "../../ApiRequests";

export const fetchCardData = createAsyncThunk("fetch/Card-data", async () => {
  try {
    const response = await GetCardDataApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const CardSlices = createSlice({
  name: "card-data",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCardData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCardData.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CardSlices.reducer;
