import { Reorder } from 'framer-motion';
import { useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Select } from 'antd';
import DragIcon from '@/shared/assets/drag.svg';
import DragActiveIcon from '@/shared/assets/dragActive.svg';
import s from './ReorderList.module.scss';

export const ReorderList = ({fields, setFields, handleChange}) => {

    const [draggedItem, setDraggedItem] = useState(null);

    return (
        <VStack gap={8} max align='center'>
            <h2>Выбор порядка полей шаблона</h2>
            <VStack max className={s.reorderListWrapper}>
                <Reorder.Group 
                    as='ol' 
                    values={fields} 
                    onReorder={setFields}
                    className={s.itemsWrapper}
                >
                    {fields.map(item => (
                        <Reorder.Item 
                            key={item.name} 
                            value={item} 
                            className={classNames(s.item, {[s.drag]: draggedItem === item}, [])} 
                            onDragStart={() => setDraggedItem(item)}
                            onDragEnd={() => setDraggedItem(null)}
                        >
                            <p className={s.itemText}>{item.name}</p>
                            <HStack gap={4} align='center'>
                                <p>могут редактировать:</p>
                                <Select
                                    value={item.rights}
                                    style={{
                                        width: 150,
                                    }}
                                    onChange={(value) => handleChange(item, value)}
                                    options={[
                                        {
                                            value: 'USER',
                                            label: 'Все',
                                        },
                                        {
                                            value: 'MANAGER',
                                            label: 'Редактор',
                                        },
                                        {
                                            value: 'ADMIN',
                                            label: 'Администратор',
                                        },
                              
                                    ]}
                                />

                                { draggedItem === item ? <DragActiveIcon /> : <DragIcon />}
                            </HStack>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </VStack>
        </VStack>
    );
};