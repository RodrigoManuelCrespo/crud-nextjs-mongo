import { configureStore } from '@reduxjs/toolkit'
import { Slice } from './slice'
// import { tasksApi } from '@/services/tasksService'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        tasks: Slice.reducer,
        // [tasksApi.reducerPath]: tasksApi.reducer
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
