import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const hostSlice = createSlice({
    name: 'hostSlice',
    initialState: {
        bedTypes: [
            { id: 1, name: 'Double' },
            { id: 2, name: 'Queen' },
            { id: 3, name: 'Single' },
            { id: 4, name: 'Sofa bed' },
        ],
        detailRooms: []
    },
    reducers: {
        pushToDetailRooms: (state, action) => {
            state.detailRooms.push(action.payload);
        },

        updateDetailRooms: (state, action) => {
            const newUpdate = action.payload;
            const indexRoom = state.detailRooms.findIndex(item => item.name === newUpdate.room);
            const indexType = state.detailRooms[indexRoom].bed_type.findIndex(item => item.bed_type_id === newUpdate.detail.bed_type_id);
            if (indexType != -1) {
                state.detailRooms[indexRoom].bed_type[indexType] = newUpdate.detail;
            } else {
                state.detailRooms[indexRoom].bed_type.push(newUpdate.detail)
            }
        },
    },
});

const { reducer, actions } = hostSlice;
export const { pushToDetailRooms, updateDetailRooms } = actions;
export default reducer;