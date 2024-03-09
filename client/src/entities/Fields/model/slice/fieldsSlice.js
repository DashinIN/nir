import { createSlice } from '@reduxjs/toolkit';

const fieldsSlice = createSlice({
    name: 'fields',
    initialState: [],
    reducers: {
        setFields: (state, action) => {
            return action.payload;
        },
        updateField: (state, action) => {
            const { name, rights } = action.payload;
            return state.map(item =>
                item.name === name ? { name: item.name, rights } : item
            );
        },
    },
});

export const { actions: fieldsActions } = fieldsSlice;
export const { reducer: fieldsReducer } = fieldsSlice;