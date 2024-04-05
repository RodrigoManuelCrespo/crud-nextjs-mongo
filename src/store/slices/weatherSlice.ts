import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: []
    },
    reducers: {
        setWeather: (state, action) => {
            state.weather = action.payload;
        }
    }
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
