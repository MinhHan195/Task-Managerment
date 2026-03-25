/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from "../service/task.service";
import { de } from 'date-fns/locale';

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
    reducers: {
        deleteTask: (state, action) => {
            if (action.payload.state === 'to-do') {
                state.todo = state.todo.filter(task => task.id !== action.payload.id);
            } else if (action.payload.state === 'in-progress') {
                state.inprogress = state.inprogress.filter(task => task.id !== action.payload.id);
            } else if (action.payload.state === 'done') {
                state.done = state.done.filter(task => task.id !== action.payload.id);
            }
        },

        createTask: (state, action) => {
            if (action.payload.state === 'to-do') {
                state.todo.push(action.payload);
            } else if (action.payload.state === 'in-progress') {
                state.inprogress.push(action.payload);
            } else if (action.payload.state === 'done') {
                state.done.push(action.payload);
            }
        },

        updateTask: (state, action) => {
            const updatedTask = action.payload;
            let counter = 0;
            if (updatedTask.state === 'to-do') {
                state.todo = state.todo.map((task) => {
                    if (task.id === updatedTask.id) {
                        counter++;
                        return updatedTask;
                    }
                    return task;
                    // task => task.id === updatedTask.id ? updatedTask : task
                });
                if (counter === 0) {
                    state.todo.push(updatedTask);
                    state.inprogress = state.inprogress.filter(task => task.id !== updatedTask.id);
                    state.done = state.done.filter(task => task.id !== updatedTask.id);
                }
            } else if (updatedTask.state === 'in-progress') {
                state.inprogress = state.inprogress.map((task) => {
                    if (task.id === updatedTask.id) {
                        counter++;
                        return updatedTask;
                    }
                    return task;
                    // task => task.id === updatedTask.id ? updatedTask : task
                });
                if (counter === 0) {
                    state.inprogress.push(updatedTask);
                    state.todo = state.todo.filter(task => task.id !== updatedTask.id);
                    state.done = state.done.filter(task => task.id !== updatedTask.id);
                }
            } else if (updatedTask.state === 'done') {
                state.done = state.done.map((task) => {
                    if (task.id === updatedTask.id) {
                        counter++;
                        return updatedTask;
                    }
                    return task;
                    // task => task.id === updatedTask.id ? updatedTask : task
                });
                if (counter === 0) {
                    state.done.push(updatedTask);
                    state.todo = state.todo.filter(task => task.id !== updatedTask.id);
                    state.inprogress = state.inprogress.filter(task => task.id !== updatedTask.id);
                }
            }
        },
    },
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

export const { deleteTask, createTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;