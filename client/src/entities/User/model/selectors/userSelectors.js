export const getUser = (state) => state.user.user || {};
export const getIsAuth = (state) => state.user.isAuth || false;
export const getUserRole = (state) => state.user.user.role || undefined;