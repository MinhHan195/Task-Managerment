import { configureStore } from '@reduxjs/toolkit';
import toastReducer from '../redux/toastSlide';

export const store = configureStore({
    reducer: {
        toast: toastReducer,
    },
}); 