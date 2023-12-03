import { Reorder } from 'framer-motion';
import { useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import DragIcon from '@/shared/assets/drag.svg';
import DragActiveIcon from '@/shared/assets/dragActive.svg';
import s from './ReorderList.module.scss';

export const ReorderList = ({items, setItems}) => {

    const [draggedItem, setDraggedItem] = useState(null);
   
    return (
        <VStack max className={s.reorderListWrapper}>
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
                        { draggedItem === item ? <DragActiveIcon /> : <DragIcon />}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </VStack>
    );
};
