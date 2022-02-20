import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "../../api/notificationApi";

export const getMyNotify = createAsyncThunk('notify/me', async (payload) => {
    try {
        const response = await notificationApi.getMyNotications(payload);
        return response;
    } catch (err) {
        console.log(err.message);
    }
});

export const fetchMyNotify = createAsyncThunk('notify/fetch', async (payload) => {
    const response = await notificationApi.getMyNotications(payload);
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
        totalPage: 0,
        currentPage: 1,
    },

    reducers: {
        nextPage(state) {
            if (state.currentPage < state.totalPage) {
                state.currentPage += 1;
                console.log(state.currentPage);
            }
        }
    },

    extraReducers: {
        [getMyNotify.fulfilled]: (state, action) => {
            try {
                if (state.currentPage == 1) {
                    state.myNotify = [];
                }
                state.myNotify = state.myNotify.concat(action.payload.data.data.data);
                state.totalPage = action.payload.data.data.last_page;
            } catch (err) {
                console.log(err.message);
            }
        },

        [fetchMyNotify.fulfilled]: (state, action) => {
            try {
                state.myNotify = action.payload.data.data.data;
                state.totalPage = action.payload.data.data.last_page;
                state.currentPage = 1;
            } catch (err) {
                console.log(err.message);
            }
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
export const { nextPage } = actions;
export default reducer;