import { classNames } from '@/shared/lib/classNames/classNames';
import s from './Flex.module.scss';

const justifyClasses = {
    start: s.justifyStart,
    center: s.justifyCenter,
    end: s.justifyEnd,
    between: s.justifyBetween,
};

const alignClasses = {
    start: s.alignStart,
    center: s.alignCenter,
    end: s.alignEnd,
};

const directionClasses = {
    row: s.directionRow,
    column: s.directionColumn,
};

const gapClasses = {
    4: s.gap4,
    8: s.gap8,
    16: s.gap16,
    32: s.gap32,
};

export const Flex = (props) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods = {
        [s.max]: max,
    };

    return (
        <div className={classNames(s.Flex, mods, classes)}>
            {children}
        </div>
    );
};
