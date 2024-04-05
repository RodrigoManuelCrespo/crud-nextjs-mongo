import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import taskSlice from './slices/taskSlice';
import weatherSlice from './slices/weatherSlice';

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
        weather: weatherSlice,
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
