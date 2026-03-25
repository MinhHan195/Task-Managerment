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
        sortState: 'Date'
    },
    reducers: {
        setSortState: (state, action) => {
            state.sortState = action.payload;
        },

        applySorting: (state) => {
            const sortByDeadline = (tasks) => {
                return [...tasks].sort((a, b) => {
                    const dateA = new Date(a.deadline).getTime();
                    const dateB = new Date(b.deadline).getTime();
                    return dateA - dateB;
                });
            };

            const sortByPriority = (tasks) => {
                const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
                return [...tasks].sort((a, b) => {
                    const priorityA = priorityOrder[a.priority] ?? 3;
                    const priorityB = priorityOrder[b.priority] ?? 3;
                    return priorityA - priorityB;
                });
            };

            const sortByTitle = (tasks) => {
                return [...tasks].sort((a, b) => {
                    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
                });
            };

            const applySort = (sortType) => {
                switch (sortType) {
                    case 'Date':
                        state.todo = sortByDeadline(state.todo);
                        state.inprogress = sortByDeadline(state.inprogress);
                        state.done = sortByDeadline(state.done);
                        break;
                    case 'Priority':
                        state.todo = sortByPriority(state.todo);
                        state.inprogress = sortByPriority(state.inprogress);
                        state.done = sortByPriority(state.done);
                        break;
                    case 'Alphabetical':
                        state.todo = sortByTitle(state.todo);
                        state.inprogress = sortByTitle(state.inprogress);
                        state.done = sortByTitle(state.done);
                        break;
                    default:
                        break;
                }
            };

            applySort(state.sortState);
        },

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
            // Apply sorting after creating task
            taskSlice.caseReducers.applySorting(state);
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
            // Apply sorting after updating task
            taskSlice.caseReducers.applySorting(state);
        },

        sortTasksByDeadline: (state) => {
            state.sortState = 'Date';
            const sortByDeadline = (tasks) => {
                return [...tasks].sort((a, b) => {
                    const dateA = new Date(a.deadline).getTime();
                    const dateB = new Date(b.deadline).getTime();
                    return dateA - dateB;
                });
            };

            state.todo = sortByDeadline(state.todo);
            state.inprogress = sortByDeadline(state.inprogress);
            state.done = sortByDeadline(state.done);
        },

        sortTasksByPriority: (state) => {
            state.sortState = 'Priority';
            const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };

            const sortByPriority = (tasks) => {
                return [...tasks].sort((a, b) => {
                    const priorityA = priorityOrder[a.priority] ?? 3;
                    const priorityB = priorityOrder[b.priority] ?? 3;
                    return priorityA - priorityB;
                });
            };

            state.todo = sortByPriority(state.todo);
            state.inprogress = sortByPriority(state.inprogress);
            state.done = sortByPriority(state.done);
        },

        sortTasksByTitle: (state) => {
            state.sortState = 'Alphabetical';
            const sortByTitle = (tasks) => {
                return [...tasks].sort((a, b) => {
                    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
                });
            };

            state.todo = sortByTitle(state.todo);
            state.inprogress = sortByTitle(state.inprogress);
            state.done = sortByTitle(state.done);
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

export const { deleteTask, createTask, updateTask, setSortState, applySorting, sortTasksByDeadline, sortTasksByPriority, sortTasksByTitle } = taskSlice.actions;

export default taskSlice.reducer;