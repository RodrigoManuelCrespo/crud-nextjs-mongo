import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import taskSlice from './slices/taskSlice';
import weatherSlice from './slices/weatherSlice';
import globalSlice from './slices/globalSlice';
import goalsSlice from './slices/goalsSlice';

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
        weather: weatherSlice,
        global: globalSlice,
        goals: goalsSlice,
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
