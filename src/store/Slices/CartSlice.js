import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCustomerApi,
  GetAllProductApi,
  GetCartApi,
} from "../../ApiRequests";

export const fetchCart = createAsyncThunk("fetch/Cart", async (id) => {
  try {
    const response = await GetCartApi(id);
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CartSlice.reducer;
