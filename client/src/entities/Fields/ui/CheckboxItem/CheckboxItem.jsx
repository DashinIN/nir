import { classNames } from '@/shared/lib/classNames/classNames';
import s from './CheckboxItem.module.scss';

export const CheckboxItem = ({label, handleCheck, changeHandler}) => {
    
    const mods = {
        [s.checked]: handleCheck
    };
    
    return (
        <div 
            className={classNames(s.CheckboxItem, mods, [])}
            onClick={changeHandler}
        >
            <div >
                <input 
                    className={s.checkbox}
                    onChange={() => {}} 
                    checked={handleCheck} 
                    type="checkbox" 
                    name="check"
                />
                <label htmlFor="check"><span />{label}</label>
            </div>
            
        </div>
    );
};
