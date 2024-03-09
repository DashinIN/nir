import { createSlice } from '@reduxjs/toolkit';

const sampleSlice = createSlice({
    name: 'sample',
    initialState: 0,
    reducers: {
        setSelectedSample: (state, action) => {
            return action.payload;
        },
    },
});



export const { actions: sampleActions } = sampleSlice;
export const { reducer: sampleReducer } = sampleSlice;

