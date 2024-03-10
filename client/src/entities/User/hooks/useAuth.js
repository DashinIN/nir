import { useSelector } from 'react-redux';
import { getIsAuth, getUser } from '../model/selectors/userSelectors';

export const useAuth = () => {
    const user = useSelector(getUser);
    const isAuth = useSelector(getIsAuth);

    return { user, isAuth };
};
