export const getIsEdit = (state) => (state.edit ? state.edit.isEdit || false : false);

export const getEditSample = (state) => (state.edit ? state.edit.sample || null : null);
