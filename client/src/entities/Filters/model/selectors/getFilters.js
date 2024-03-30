import { createSelector } from 'reselect';

const filters = (state) => state.filters || [];
const OrgTypeFilterValue = (state) => (state.filters ? state.filters.orgType || [] : []);
const StatusEgrulFilterValue = (state) => (state.filters ? state.filters.statusEgrul || [] : []);
const FedOkrugFitlerValue = (state) => (state.filters ? state.filters.fedOkrug || [] : []);
const LevelFilterValue = (state) => (state.filters ? state.filters.level || [] : []);
const RegionFilterValue = (state) => (state.filters ? state.filters.region || [] : []);

export const getOrgTypeFilterValue = createSelector(
    [OrgTypeFilterValue],
    (OrgTypeFilterValue) => OrgTypeFilterValue
);

export const getStatusEgrulFilterValue = createSelector(
    [StatusEgrulFilterValue],
    (StatusEgrulFilterValue) => StatusEgrulFilterValue
);
  
export const getFedOkrugFitlerValue = createSelector(
    [FedOkrugFitlerValue],
    (FedOkrugFitlerValue) => FedOkrugFitlerValue
);
  
export const getLevelFilterValue = createSelector(
    [LevelFilterValue],
    (LevelFilterValue) => LevelFilterValue
);
  
export const getRegionFilterValue = createSelector(
    [RegionFilterValue],
    (RegionFilterValue) => RegionFilterValue
);


export const getFilters = createSelector(
    [filters],
    (filters) => filters
);