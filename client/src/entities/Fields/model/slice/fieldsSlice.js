import { createSlice } from '@reduxjs/toolkit';

const fieldsSlice = createSlice({
    name: 'fields',
    initialState: [],
    reducers: {
        setFields: (state, action) => {
            return action.payload;
        },
    },
});

export const { actions: fieldsActions } = fieldsSlice;
export const { reducer: fieldsReducer } = fieldsSlice;