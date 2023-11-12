import { classNames } from '@/shared/lib/classNames/classNames';
import s from './SelectListItem.module.scss';

export const SelectListItem = ({name, content, onSelect, isSelected}) => {
    return (
        <div 
            className={classNames(s.wrapper, {[s.active]: isSelected}, [])}
            onClick={onSelect} 
        >
            <div>{name}</div>
            <div>{content}</div>
        </div>
    );
};
