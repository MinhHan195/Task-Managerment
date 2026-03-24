import { configureStore } from '@reduxjs/toolkit';
import toastReducer from '../redux/toastSlide';
import taskReducer from '../redux/taskSlide';

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        task: taskReducer,
    },
}); 