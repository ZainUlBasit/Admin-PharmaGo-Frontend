import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllOrdersApi,
  GetAllProductApi,
  GetCartApi,
} from "../../ApiRequests";

export const fetchOrders = createAsyncThunk("fetch/Orders", async () => {
  try {
    const response = await GetAllOrdersApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default OrderSlice.reducer;
