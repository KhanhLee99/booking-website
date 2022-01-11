import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthApi from "../../api/adminAuthApi";
import userApi from "../../api/userApi";

export const login = createAsyncThunk('user/login', async (payload) => {
    const response = await userApi.login(payload);
    return response;
})

export const loginGoogle = createAsyncThunk('user/loginGoogle', async (payload) => {
    const response = await userApi.loginGoogle(payload);
    return response;
})

export const loginFacebook = createAsyncThunk('user/loginFacebook', async (payload) => {
    const response = await userApi.loginFacebook(payload);
    return response;
})

export const adminLogin = createAsyncThunk('admin/login', async (payload) => {
    const response = await adminAuthApi.login(payload);
    return response;
})

export const hostLogin = createAsyncThunk('host/login', async (payload) => {
    const response = await userApi.hostLogin(payload);
    return response;
})

// export const updateDeviceToken = createAsyncThunk('update/device-token', async (payload) => {
//     const response = await userApi.updateDeviceToken(payload);
//     return response;
// })

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')) || {},
        host: JSON.parse(localStorage.getItem('host')) || {},
        deviceToken: ''
    },
    reducers: {
        logout(state) {
            // clear local storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            // reset current
            state.current = {};
        },

        saveDeviceToken(state, action) {
            state.deviceToken = action.payload;
        },

        updateProfile(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.current = action.payload;
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.current = action.payload.data
            localStorage.setItem('access_token', action.payload.data.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data));
        },
        [hostLogin.fulfilled]: (state, action) => {
            state.current = action.payload.data
            localStorage.setItem('host_access_token', action.payload.data.token);
            localStorage.setItem('host', JSON.stringify(action.payload.data));
        },
        [loginGoogle.fulfilled]: (state, action) => {
            state.current = action.payload.data.user;
            localStorage.setItem('access_token', action.payload.data.access_token);
            localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        },
        [loginFacebook.fulfilled]: (state, action) => {
            state.current = action.payload.data.user;
            localStorage.setItem('access_token', action.payload.data.access_token);
            localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.current = action.payload.data
            localStorage.setItem('access_token', action.payload.data.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data));
        },
    }
});

const { reducer, actions } = userSlice;
export const { logout, saveDeviceToken, updateProfile } = actions;
export default reducer;

