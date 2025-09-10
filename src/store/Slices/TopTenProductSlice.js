import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllOrdersApi,
  GetAllProductApi,
  GetCartApi,
  GetCustomerOrdersApi,
  GetTopTenSellingProductsApi,
} from "../../ApiRequests";

export const fetchTopTenProduct = createAsyncThunk(
  "fetch/TopTenProduct",
  async () => {
    try {
      const response = await GetTopTenSellingProductsApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const TopTenProductSlice = createSlice({
  name: "top_ten_product",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopTenProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTopTenProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchTopTenProduct.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default TopTenProductSlice.reducer;
