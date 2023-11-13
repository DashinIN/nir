import s from './Input.module.scss';

export const Input = (props) => {
    return (
        <input className={s.input} {...props} />
    );
};
