import { classNames } from '@/shared/lib/classNames/classNames';
import s from './Button.module.scss';
export const Button = (props) => {
    const { 
        className,
        ...otherProps
    } = props;

    return (
        <button 
            className={classNames(s.button, {}, [className])} 
            {...otherProps}
        />
    );
};
