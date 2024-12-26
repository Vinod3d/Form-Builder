import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "../../utils";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user:{},
        error: null,
        message:null,
        isAuthenticated: false,
    },

    reducers : {
        // register

        registerRequest(state){
            state.loading = true;
            state.user = {};
            state.error =  null;
            state.message = null;
        },

        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.newUser;
            state.error = null;
            state.message = action.payload.message;
        },

        registerFailed(state, action) {
            state.loading = false;
            state.user = {},
            state.error = action.payload;
        },

        // Login

        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            state.message = action.payload.message
        },

        loginFailed: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.message = null;
        },

        // Logout

        logoutSuccess: (state, action)=>{
            state.user = action.payload.success && null;
            state.isAuthenticated = false;
            state.error = null;
            state.message = action.payload.message;
        },

        logoutFailed: (state, action)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.message = null;
        },

        // Update User
        updateUserRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },

        updateUserFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        // getUser

        getUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },

        getUserFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
      
        clearErrors: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    }
})


export const registerUser = (userData) => async (dispatch) =>{
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post(
            `${baseUrl}/api/user/register`, 
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());
    } catch (error) {
        dispatch(userSlice.actions.registerFailed(error.response.data.message))
    }
}


export const loginUser = (userData) => async (dispatch) =>{
    dispatch(userSlice.actions.loginRequest());
    try {
        const  response = await axios.post(
            `${baseUrl}/api/user/login`,
            userData,
            {
                withCredentials: true,
                headers : {
                    "Content-Type" : "application/json",
                }
            }
        );

        dispatch(userSlice.actions.loginSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());

    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const logout = () => async (dispatch) =>{
    try {
        const response = await axios.get(`${baseUrl}/api/user/logout`, {
            withCredentials: true,
        });


        dispatch(userSlice.actions.logoutSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());
        
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message))
    }

}


export const updateUser = (userData, userId) => async (dispatch) => {
    dispatch(userSlice.actions.updateUserRequest());
    try {
      const response = await axios.put(
        `${baseUrl}/api/user/update/${userId}`,
        userData, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true,
        }
      );
  
      dispatch(userSlice.actions.updateUserSuccess(response.data));
      return true;
    } catch (error) {
      dispatch(userSlice.actions.updateUserFailed(error.response.data.message));
      return false;
    }
};


export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.getUserRequest());
    try {
      const response = await axios.get(`${baseUrl}/api/user`, {
        withCredentials: true,
      });

      console.log(response)
      dispatch(userSlice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(userSlice.actions.getUserFailed(error.response.data.message));
    }
  };
  


export const clearErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearErrors());
};

export const clearMessage = () => (dispatch) => {
    dispatch(userSlice.actions.clearMessage());
};


export default userSlice.reducer;