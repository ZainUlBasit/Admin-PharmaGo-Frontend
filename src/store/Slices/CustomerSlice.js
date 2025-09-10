import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllProductApi,
  GetCustomerApi,
} from "../../ApiRequests";

export const fetchCustomers = createAsyncThunk("fetch/Customer", async (id) => {
  try {
    let response;
    if (id) response = await GetCustomerApi(id);
    else response = await GetAllCustomerApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const CustomerSlice = createSlice({
  name: "customers",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CustomerSlice.reducer;
