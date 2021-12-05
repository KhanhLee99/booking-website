import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingApi from "../../api/listingApi";

// export const getListingsLocation = createAsyncThunk('listingsLocation', async () => {
//     const response = await listingApi.getListingsLocation();
//     return response;
// })
const listingLocationSlice = createSlice({
    name: 'listings',
    initialState: {
        // listingsLocation: [],
    },
    reducers: {
        // getListingsLocation: (state, action) => {
        //     state = action.payload
        // }
    },
    extraReducers : {
        // [getListingsLocation.fulfilled]: (state, action) => {
        //     state.listingsLocation = action.payload.data.data;
        //     console.log(state);
        // }
    }
});

const { reducer, actions } = listingLocationSlice;
export const {  } = actions;
export default reducer;