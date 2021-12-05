import { configureStore } from '@reduxjs/toolkit';
import guestReducer from '../features/Guest/guestSlice';
import listingsReducer from '../features/Listings/listingLocationSlice';

const rootReducer = {
	abc: guestReducer,
	listings: listingsReducer
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
