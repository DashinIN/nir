import { createSelector } from 'reselect';

const selectFields = state => state.fields || [];

export const getFields = createSelector(
    [selectFields],
    fields => fields
);