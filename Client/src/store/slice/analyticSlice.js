import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const formAnalyticsSlice = createSlice({
  name: "formAnalytics",
  initialState: {
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Analytics
      .addCase(fetchFormAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchFormAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Analytics
      .addCase(updateFormAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFormAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(updateFormAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Async thunk for fetching form analytics
export const fetchFormAnalytics = createAsyncThunk(
  "formAnalytics/fetchFormAnalytics",
  async (formId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/analytics/form/${formId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred while fetching analytics.");
    }
  }
);

// Async thunk for updating form analytics
export const updateFormAnalytics = createAsyncThunk(
  "formAnalytics/updateFormAnalytics",
  async ({ formId, updates }, { rejectWithValue }) => {
    console.log(updates)
    try {
      const { data } = await axios.patch(`${baseUrl}/api/analytics/form/${formId}`, { updates });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred while updating analytics.");
    }
  }
);

export default formAnalyticsSlice.reducer;
