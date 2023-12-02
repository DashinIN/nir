import { createSlice } from '@reduxjs/toolkit';

const sampleSlice = createSlice({
    name: 'sample',
    initialState: {
        selectedSample: 0,
    },
    reducers: {
        setSelectedSample: (state, action) => {
            state.selectedSample = action.payload;
        },
    },
});


export const { actions: sampleActions } = sampleSlice;
export const { reducer: sampleReducer } = sampleSlice;