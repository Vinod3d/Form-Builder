import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const formSlice = createSlice({
  name: "form",
  initialState: {
    loading: false,
    forms: [],
    error: null,
    message: null,
  },
  reducers: {
    // Fetch Forms
    getFormByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getFormByIdSuccess(state, action) {
      state.loading = false;
      state.forms = action.payload;
    },
    getFormByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Form
    addFormRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addFormSuccess(state, action) {
      console.log("Added form:", action.payload);
      state.loading = false;
      state.forms = [...state.forms, action.payload];
      state.message = "Form created successfully";
    },
    addFormFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Form
    deleteFormRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFormSuccess(state, action) {
      state.loading = false;
      state.forms = state.forms.filter(
        (form) => form._id !== action.payload.formId
      );
      state.message = "Form deleted successfully";
    },
    deleteFormFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Form
    updateFormRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateFormSuccess(state, action) {
      state.loading = false;
      state.forms = state.forms.map((form) =>
        form._id === action.payload._id ? action.payload : form
      );
      state.message = "Form Saved.";
    },
    updateFormFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get form by folder id

    getFormsByFolderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getFormsByFolderSuccess(state, action) {
      state.loading = false;
      state.forms = action.payload;
    },
    getFormsByFolderFailed(state, action) {
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


// Fetch Forms
export const fetchFormById = (formId) => async (dispatch) => {
  dispatch(formSlice.actions.getFormByIdRequest());
  try {
    const response = await axios.get(
      `${baseUrl}/api/workspace/folder/getform/${formId}`,
      {
        withCredentials: true,
      }
    );
    dispatch(formSlice.actions.getFormByIdSuccess(response.data.form));
  } catch (error) {
    dispatch(
      formSlice.actions.getFormByIdFailed(error.response?.data?.message)
    );
  }
};

// Add Form
export const addNewForm =
  ({ title, folderId }) =>
  async (dispatch) => {
    console.log(title, folderId);
    dispatch(formSlice.actions.addFormRequest());
    try {
      const response = await axios.post(
        `${baseUrl}/api/workspace/folder/addform`,
        { title, folderId },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.form);
      dispatch(formSlice.actions.addFormSuccess(response.data.form));
    } catch (error) {
      dispatch(formSlice.actions.addFormFailed(error.response?.data?.message));
    }
  };

// Delete Form
export const deleteForm = (folderId, formId) => async (dispatch) => {
  console.log(folderId, formId);
  dispatch(formSlice.actions.deleteFormRequest());
  try {
    await axios.delete(`${baseUrl}/api/workspace/folder/deleteform`, {
      data: { folderId, formId },
      withCredentials: true,
    });
    dispatch(formSlice.actions.deleteFormSuccess({ folderId, formId }));
  } catch (error) {
    dispatch(formSlice.actions.deleteFormFailed(error.response?.data?.message));
  }
};

// Async Thunk: Update Form
export const updateForm = ({formId, updatedData}) => async (dispatch) => {

  console.log(formId, updatedData);
  dispatch(formSlice.actions.updateFormRequest());
  try {
    const response = await axios.patch(
      `${baseUrl}/api/workspace/folder/form/${formId}`,
      updatedData,
      { withCredentials: true }
    );

    console.log(response)

    dispatch(formSlice.actions.updateFormSuccess(response.data));
  } catch (error) {
    dispatch(
      formSlice.actions.updateFormFailed(error.response?.data?.message)
    );
  }
};


// Fetching Forms by Folder ID
export const fetchFormsByFolderId = (folderId) => async (dispatch) => {
  console.log(folderId);
  dispatch(formSlice.actions.getFormsByFolderRequest());
  try {
    const response = await axios.get(
      `${baseUrl}/api/workspace/folder/${folderId}/getforms`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    dispatch(formSlice.actions.getFormsByFolderSuccess(response.data.forms));
  } catch (error) {
    dispatch(
      formSlice.actions.getFormsByFolderFailed(error.response?.data?.message)
    );
  }
};

export const { clearErrors, clearMessage } = formSlice.actions;

export default formSlice.reducer;
