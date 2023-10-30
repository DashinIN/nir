import { Reorder } from 'framer-motion';
import s from './ReorderList.module.scss';

export const ReorderList = ({items, setItems}) => {

    return (
        <Reorder.Group as='ol' values={items} onReorder={setItems} className={s.itemsWrapper}>
            {items.map(item => (
                <Reorder.Item key={item} value={item} className={s.item}>
                    {item}
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
};
