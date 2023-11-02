import { classNames } from '@/shared/lib/classNames/classNames';
import s from './CheckboxItem.module.scss';

export const CheckboxItem = ({label, handleCheck, handleCheckboxChange}) => {
    
    const mods = {
        [s.checked]: handleCheck
    };
    
    return (
        <div 
            className={classNames(s.CheckboxItem, mods, [])}
            onClick={handleCheckboxChange}
        >
            <input 
                type="checkbox" 
                name="check" 
                checked={handleCheck}
            />
            <label htmlFor="check">{label}</label>
        </div>
    );
};
