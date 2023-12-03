import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
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
            <Input 
                placeholder='Поиск поля' 
                type="text" 
                value={searchValue}
                onChange={searchHandler}
            />
            <Button onClick={resetSearchHandler} className={s.cancelButton}>
                <CancelIcon className={s.cancelIcon}/>
            </Button>
        </HStack>
    );
};

