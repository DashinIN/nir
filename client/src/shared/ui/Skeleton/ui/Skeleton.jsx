import { classNames } from '@/shared/lib/classNames/classNames';
import s from './Skeleton.module.scss';



export const Skeleton = (props) => {
    const {
        className,
        height,
        width,
        border,
    } = props;

    const styles = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(s.Skeleton, {}, [className])}
            style={styles}
        />
    );
};
