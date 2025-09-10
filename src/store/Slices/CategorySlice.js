import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCatgeoryApi } from "../../ApiRequests";

export const fetchCategories = createAsyncThunk(
  "fetch/Categories",
  async () => {
    try {
      const response = await GetCatgeoryApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CategorySlice.reducer;
