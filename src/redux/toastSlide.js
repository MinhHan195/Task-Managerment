// import { createSlice } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        show: false,
        msg: '',
        type: ''
    },
    reducers: {
        setToast: (state, action) => {
            const { show, msg, type } = action.payload || {};
            state.show = show;
            state.msg = msg;
            state.type = type;
        },
    },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;