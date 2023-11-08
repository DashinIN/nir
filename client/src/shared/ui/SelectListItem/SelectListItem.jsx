import { classNames } from '@/shared/lib/classNames/classNames';
import s from './SelectListItem.module.scss';

export const SelectListItem = ({name, content, onClick, isSelected}) => {
    return (
        <div onClick={onClick} className={classNames(s.wrapper, {[s.active]: isSelected}, [])}>
            <div>{name}</div>
            <div>{content}</div>
        </div>
    );
};
