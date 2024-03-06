import { Button, Input as InputAntd } from 'antd';
import { HStack } from '@/shared/ui/Stack';
import CancelIcon from '@/shared/assets/cancel.svg';
import SearchIcon from '@/shared/assets/search.svg';
import s from './Search.module.scss';


export const Search = ({searchValue, setSearchValue}) => {
    
    const searchHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const resetSearchHandler = () => {
        setSearchValue('');
    };

    return (
        <HStack gap={4}>
            <SearchIcon className={s.searchIcon}/>
            <InputAntd
                placeholder="Поиск поля"
                size='middle'
                value={searchValue}
                onChange={searchHandler}
            />
            <Button onClick={resetSearchHandler} className={s.cancelButton}>
                <CancelIcon className={s.cancelIcon}/>
            </Button>
        </HStack>
    );
};

