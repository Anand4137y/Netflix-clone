// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './createSlice'

const store = configureStore({
    reducer: {
        auth: authReducer, // Ensure 'authReducer' is a valid reducer function
    },
});

export default store;
