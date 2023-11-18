import { Reorder } from 'framer-motion';
import s from './ReorderList.module.scss';
import { useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

export const ReorderList = ({items, setItems}) => {

    const [draggedItem, setDraggedItem] = useState(null);
   
    return (
        <div className={s.reorderListWrapper}>
            <Reorder.Group 
                as='ol' 
                values={items} 
                onReorder={setItems}
                className={s.itemsWrapper}>
                {items.map(item => (
                    <Reorder.Item 
                        key={item} 
                        value={item} 
                        className={classNames(s.item, {[s.drag]: draggedItem === item}, [])} 
                        onDragStart={() => setDraggedItem(item)}
                        onDragEnd={() => setDraggedItem(null)}
                    >
                        {item}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};
