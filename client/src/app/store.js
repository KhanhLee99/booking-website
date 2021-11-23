import { configureStore } from '@reduxjs/toolkit';
import guestReducer from '../features/Guest/guestSlice';

const rootReducer = {
	abc: guestReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
