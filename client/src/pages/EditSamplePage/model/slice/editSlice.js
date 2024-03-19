import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
    name: 'edit',
    initialState: {
        isEdit: false,
        sample: null
    },
    reducers: {
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        setEditSample: (state, action) => {
            state.sample = action.payload;
        },
    },
});



export const { actions: editActions } = editSlice;
export const { reducer: editReducer } = editSlice;

