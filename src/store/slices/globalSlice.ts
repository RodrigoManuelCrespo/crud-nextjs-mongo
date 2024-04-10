// slices/globalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        message: '',
        isVisible: false,
    },
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        showSnackbar(state, action) {
            state.snackbar.message = action.payload;
            state.snackbar.isVisible = true;
        },
        hideSnackbar(state) {
            state.snackbar.isVisible = false;
        },
    },
});

export const { showSnackbar, hideSnackbar } = globalSlice.actions;

export default globalSlice.reducer;
