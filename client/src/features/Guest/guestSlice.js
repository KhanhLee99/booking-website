import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testApi from "../../api/testApi";

export const login = createAsyncThunk('user/login', async (payload) => {
    const response = await testApi.login(payload);
    return response;
})

// function handleLogout() {
//     return new Promise(function (resolve) {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('role');
//         resolve(true);
//     })
// }
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


const guestSlice = createSlice({
    name: 'guests',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')) || {}
    },
    reducers: {
        addGuest: (state, action) => {
            state.push(action.payload)
        },

        // logout: (state) => {
        //     // clear local storage
        //     localStorage.removeItem('access_token');
        //     localStorage.removeItem('user');
        //     localStorage.removeItem('role');
        //     // reset current
        //     state.current = {};
        // }
    },
    // when thunk successfully, use extraReducer update data
    extraReducers: {
        //     [login.fulfilled]: (state, action) => {
        // 		state.current = action.payload;
        // 	},
        [logout.fulfilled]: (state) => {
            state.current = {};
        },
    }
});

const { reducer, actions } = guestSlice;
export const { addGuest } = actions;
export default reducer;