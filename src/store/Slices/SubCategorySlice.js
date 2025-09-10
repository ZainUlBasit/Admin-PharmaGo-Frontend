import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetSubCatgeoryApi } from "../../ApiRequests";

export const fetchSubCategories = createAsyncThunk(
  "fetch/SubCategories",
  async () => {
    try {
      const response = await GetSubCatgeoryApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const SubCategorySlice = createSlice({
  name: "SubCategory",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchSubCategories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default SubCategorySlice.reducer;
