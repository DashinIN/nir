import s from './Button.module.scss';
export const Button = (props) => {

    return (
        <button className={s.button} {...props} />
    );
};
