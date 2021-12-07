import { configureStore } from '@reduxjs/toolkit';
import guestReducer from '../features/Guest/guestSlice';
import listingsReducer from '../features/Listings/listingLocationSlice';
import userSlice from './reducer/userSlice';

const rootReducer = {
	abc: guestReducer,
	listings: listingsReducer,
	userSlice: userSlice,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
