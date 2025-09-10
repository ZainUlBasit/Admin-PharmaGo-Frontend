import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetMyProfileApi } from "../../ApiRequests";

export const fetchMyProfile = createAsyncThunk(
  "fetch/MyProfile",
  async (id) => {
    try {
      const response = await GetMyProfileApi(id);
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const MyProfileSlice = createSlice({
  name: "MyProfile",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default MyProfileSlice.reducer;
