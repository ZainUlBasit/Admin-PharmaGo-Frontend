import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllOrdersApi,
  GetAllProductApi,
  GetCartApi,
  GetCustomerOrdersApi,
} from "../../ApiRequests";

export const fetchCustomerOrders = createAsyncThunk(
  "fetch/CustomerOrders",
  async (id) => {
    try {
      const response = await GetCustomerOrdersApi(id);
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const CustomerOrderSlice = createSlice({
  name: "customer_orders",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCustomerOrders.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CustomerOrderSlice.reducer;
