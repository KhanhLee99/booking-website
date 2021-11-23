import { createSlice } from "@reduxjs/toolkit";


const guestSlice = createSlice({
    name: 'guests',
    initialState: [],
    reducers: {
        addGuest: (state, action) => {
            state.push(action.payload)
        }
    }
});

const { reducer, actions } = guestSlice;
export const { addGuest } = actions;
export default reducer;