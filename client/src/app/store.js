import { configureStore } from '@reduxjs/toolkit';
import guestReducer from './reducer/guestSlice';
import listingsReducer from '../features/Listings/listingLocationSlice';
import userSlice from './reducer/userSlice';
import hostSlice from './reducer/hostSlice';
import eventSlice from './reducer/eventSlice';


const rootReducer = {
	abc: guestReducer,
	listings: listingsReducer,
	userSlice: userSlice,
	hostSlice: hostSlice,
	eventSlice: eventSlice,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
