import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const { setTasks } = Slice.actions