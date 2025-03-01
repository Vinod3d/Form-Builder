import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const responseSlice = createSlice({
  name: "responses",
  initialState: {
    responses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponsesByFormId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResponsesByFormId.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload;
      })
      .addCase(fetchResponsesByFormId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.responses.push(action.payload);
      })
      .addCase(createResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Async thunk for fetching all responses
export const fetchResponsesByFormId = createAsyncThunk(
    "responses/fetchResponsesByFormId",
    async (formId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/response/getall/${formId}`);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Async thunk for creating a response
  export const createResponse = createAsyncThunk(
    "responses/createResponse",
    async (responseData, { rejectWithValue }) => {
        console.log(responseData)
      try {
        const { data } = await axios.post(`${baseUrl}/api/response/create`, responseData);
        console.log(data)
        return data;
      } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data);
      }
    }
  );

export default responseSlice.reducer;
