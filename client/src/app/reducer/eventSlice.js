import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        entities: [],
        eventDialog: {
            type: 'new',
            props: {
                open: false
            },
            data: null
        }
    },
    reducers: {
        openNewEventDialog(state, action) {
            console.log(action.payload)
            return {
                ...state,
                eventDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: {
                        ...action.payload
                    }
                }
            };
        },

        closeNewEventDialog(state) {
            return {
                ...state,
                eventDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        },

        openEditEventDialog(state, action) {
            return {
                ...state,
                eventDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: {
                        ...action.payload,
                        start: new Date(action.payload.start),
                        end: new Date(action.payload.end)
                    }
                }
            };
        },

        closeEditEventDialog(state) {
            return {
                ...state,
                eventDialog: {
                    type: 'edit',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
    },
});

const { reducer, actions } = eventSlice;
export const { openNewEventDialog, closeNewEventDialog, openEditEventDialog, closeEditEventDialog } = actions;
export default reducer;
