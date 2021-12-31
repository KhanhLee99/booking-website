import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testApi from "../../api/testApi";
import listingApi from "../../api/listingApi";


export const login = createAsyncThunk('user/login', async (payload) => {
    const response = await testApi.login(payload);
    return response;
})

export const loginGoogle = createAsyncThunk('user/loginGoogle', async (payload) => {
    const response = await testApi.loginGoogle(payload);
    return response;
})

export const loginFacebook = createAsyncThunk('user/loginFacebook', async (payload) => {
    const response = await testApi.loginFacebook(payload);
    return response;
})

export const getMe = createAsyncThunk('user/getMe', async () => {
    const response = await testApi.getMe();
    return response;
})

export const logout = createAsyncThunk('user/logout', async () => {
    const handleLogout = () => {
        return new Promise(function (resolve, reject) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            resolve();
            reject('Cannot logout');
        })
    }
    handleLogout()
        .then(() => {
            console.log('logout done');
            console.log('user current after logout: ', JSON.parse(localStorage.getItem('user')))
        })
        .catch((err) => {
            console.log(err);
        })
})

export const getListings = createAsyncThunk('listingsLocation', async () => {
    const response = await listingApi.getListingsLocation();
    return response;
})


const guestSlice = createSlice({
    name: 'guests',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')) || {},
        listings: [1, 2],
    },
    reducers: {
        addGuest: (state, action) => {
            state.push(action.payload)
        },
    },
    // when thunk successfully, use extraReducer update data
    extraReducers: {
        //     [login.fulfilled]: (state, action) => {
        // 		state.current = action.payload;
        // 	},
        [logout.fulfilled]: (state) => {
            state.current = {};
        },
        [loginGoogle.fulfilled]: (state, action) => {
            localStorage.setItem('access_token', action.payload.data.access_token);
        },
        [loginFacebook.fulfilled]: (state, action) => {
            localStorage.setItem('access_token', action.payload.data.access_token);
        },
        [getMe.fulfilled]: (state, action) => {
            state.current = action.payload.data;
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload.data
            localStorage.setItem('access_token', action.payload.data.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data));
        },
        [getListings.fulfilled]: (state, action) => {
            state.listings = action.payload.data.data
        }
    }
});

const { reducer, actions } = guestSlice;
export const { addGuest } = actions;
export default reducer;