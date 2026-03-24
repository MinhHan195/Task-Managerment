/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from "../service/task.service";

export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',
    async (state, { rejectWithValue }) => {
        try {
            const result = await taskService.getAllTasksByState(state);
            return { state, result };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        todo: [],
        inprogress: [],
        done: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                const { state: taskState, result } = action.payload;
                if (result) {
                    if (taskState === 'to-do') {
                        state.todo = result;
                    } else if (taskState === 'in-progress') {
                        state.inprogress = result;
                    } else if (taskState === 'done') {
                        state.done = result;
                    }
                }
                console.log(result);
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;