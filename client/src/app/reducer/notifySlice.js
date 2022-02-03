import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "../../api/notificationApi";

export const getMyNotify = createAsyncThunk('notify/me', async () => {
    const response = await notificationApi.getMyNotications();
    return response;
});

export const getTotalNoticationsUnread = createAsyncThunk('notify/total/unread', async () => {
    const response = await notificationApi.getTotalNoticationsUnread();
    return response;
});

export const seenNotifications = createAsyncThunk('notify/seen', async () => {
    const response = await notificationApi.seenNotifications();
    return response;
});

const notifySlice = createSlice({
    name: 'notifySlice',
    initialState: {
        myNotify: [],
        totalUnread: 0,
    },

    extraReducers: {
        [getMyNotify.fulfilled]: (state, action) => {
            state.myNotify = action.payload.data.data;
        },

        [getTotalNoticationsUnread.fulfilled]: (state, action) => {
            state.totalUnread = action.payload.data.total_unread;
        },

        [seenNotifications.fulfilled]: (state) => {
            state.totalUnread = 0;
        },
    }
})

const { reducer, actions } = notifySlice;
export const { } = actions;
export default reducer;