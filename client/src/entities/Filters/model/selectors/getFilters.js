import { createSelector } from 'reselect';

export const filters = (state) => state.filters || [];
export const OrgTypeFilterValue = (state) => (state.filters ? state.filters.orgType || [] : []);
export const StatusEgrulFilterValue = (state) => (state.filters ? state.filters.statusEgrul || [] : []);
export const FedOkrugFitlerValue = (state) => (state.filters ? state.filters.fedOkrug || [] : []);
export const LevelFilterValue = (state) => (state.filters ? state.filters.level || [] : []);
export const RegionFilterValue = (state) => (state.filters ? state.filters.region || [] : []);

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