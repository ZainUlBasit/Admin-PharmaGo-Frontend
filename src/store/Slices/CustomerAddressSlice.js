import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllProductApi,
  GetCustomerAddressApi,
} from "../../ApiRequests";

export const fetchCustomersAddress = createAsyncThunk(
  "fetch/Customer",
  async (id) => {
    try {
      const response = await GetCustomerAddressApi(id);
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const CustomerAddressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomersAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomersAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCustomersAddress.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CustomerAddressSlice.reducer;
