import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    loading: false,
    workspace: [],
    error: null,
    message: null,
  },

  reducers: {

    // Fetch My Workspace
    getMyWorkspaceRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getMyWorkspaceSuccess(state, action) {
      state.loading = false;
      state.workspace = action.payload;
    },
    getMyWorkspaceFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

export const fetchMyWorkspace = () => async (dispatch) => {
  dispatch(workspaceSlice.actions.getMyWorkspaceRequest());
  try {
    const response = await axios.get(`${baseUrl}/api/workspace/get`,{
      withCredentials: true,
    });
    // console.log(response.data)
    dispatch(workspaceSlice.actions.getMyWorkspaceSuccess(response.data));
  } catch (error) {
    dispatch(workspaceSlice.actions.getMyWorkspaceFailed(error.response?.data?.message));
  }
};

export default workspaceSlice.reducer;
