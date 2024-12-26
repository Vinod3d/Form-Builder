import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const folderSlice = createSlice({
  name: "folder",
  initialState: {
    loading: false,
    folders: [],
    error: null,
    message: null,
  },

  reducers: {
    // Fetch Folders
    getFoldersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getFoldersSuccess(state, action) {
      state.loading = false;
      const folderExists = state.folders.some(
        (folder) => folder._id === action.payload._id
      );
      if (!folderExists) {
        state.folders.push(action.payload);
      }
    },
    getFoldersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Folder
    addFolderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addFolderSuccess(state, action) {
      state.loading = false;
      state.folders.push(action.payload);
      state.message = "Folder added successfully";
    },
    addFolderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Folder
    deleteFolderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFolderSuccess(state, action) {
      state.loading = false;
      state.folders = state.folders.filter(
        (folder) => folder._id !== action.payload.folderId
      );
      state.message = "Folder deleted successfully";
    },
    deleteFolderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Errors and Messages
    clearErrors(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

// Fetching Folder by ID
export const fetchFolderById = (folderId) => async (dispatch) => {
  dispatch(folderSlice.actions.getFoldersRequest());
  try {
    const response = await axios.get(
      `${baseUrl}/api/workspace/folder/${folderId}`,
      { withCredentials: true }
    );

    dispatch(folderSlice.actions.getFoldersSuccess(response.data));
  } catch (error) {
    dispatch(
      folderSlice.actions.getFoldersFailed(error.response?.data?.message)
    );
  }
};

// Adding a Folder
export const addNewFolder = (workspaceId, folderName) => async (dispatch) => {
  dispatch(folderSlice.actions.addFolderRequest());
  try {
    const response = await axios.post(
      `${baseUrl}/api/workspace/addFolder`,
      { workspaceId, folderName },
      { withCredentials: true }
    );

    dispatch(folderSlice.actions.addFolderSuccess(response.data));
  } catch (error) {
    dispatch(
      folderSlice.actions.addFolderFailed(error.response?.data?.message)
    );
  }
};

// Deleting a Folder
export const deleteFolder = (workspaceId, folderId) => async (dispatch) => {
  dispatch(folderSlice.actions.deleteFolderRequest());
  try {
    await axios.delete(
      `${baseUrl}/api/workspace/folder`,
      {
        data: { workspaceId, folderId },
        withCredentials: true,
      }
    );

    dispatch(
      folderSlice.actions.deleteFolderSuccess({ folderId: folderId })
    );
  } catch (error) {
    dispatch(
      folderSlice.actions.deleteFolderFailed(error.response?.data?.message)
    );
  }
};

export const { clearErrors, clearMessage } = folderSlice.actions;
export default folderSlice.reducer;
