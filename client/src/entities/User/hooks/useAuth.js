import { useSelector } from 'react-redux';
import { getIsAuth, getUser, getUserRole } from '../model/selectors/userSelectors';

export const useAuth = () => {
    const user = useSelector(getUser);
    const isAuth = useSelector(getIsAuth);
    const role = useSelector(getUserRole);

    return { user, isAuth, role };
};
