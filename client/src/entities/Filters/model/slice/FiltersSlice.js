import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        orgType: [],
        statusEgrul: [],
        fedOkrug: [],
        level: [],
        region: []
    },
    reducers: {
        setOrgTypeFilter: (state, action) => {
            state.orgType = action.payload;
        },
        setStatusEgrulFilter: (state, action) => {
            state.statusEgrul = action.payload;
        },
        setFedOkrugFilter: (state, action) => {
            state.fedOkrug = action.payload;
        },
        setLevelFilter: (state, action) => {
            state.level = action.payload;
        },
        setRegionFilter: (state, action) => {
            state.region = action.payload;
        },
        setCorrectRegions: (state, action) => {
            state.region = state.region.filter(region => action.payload.includes(region));
        }
    },
});



export const { actions: filtersActions } = filtersSlice;
export const { reducer: filtersReducer } = filtersSlice;

