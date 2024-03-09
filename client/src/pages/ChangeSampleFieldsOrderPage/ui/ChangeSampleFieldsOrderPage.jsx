import { useDispatch, useSelector } from 'react-redux';
import { Reorder } from 'framer-motion';
import { Select } from 'antd';
import { useState } from 'react';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';
import DragIcon from '@/shared/assets/drag.svg';
import DragActiveIcon from '@/shared/assets/dragActive.svg';
import s from './ChangeSampleFieldsOrderPage.module.scss';


const initialReducers = {
    fields: fieldsReducer,
};

const ChangeSampleFieldsOrderPage = () => {
    const dispatch = useDispatch();
    const fields = useSelector(getFields) || [];

    const handleSelectedFields = (selectedFields) => {
        console.log(selectedFields);
        dispatch(fieldsActions.setFields(selectedFields));
    };

    const [draggedItem, setDraggedItem] = useState(null);

    const handleChange = (item, value) => {
        
        const newData = {
            name: item.name, 
            rights: value
        };
        console.log(newData);
        dispatch(fieldsActions.updateField(newData));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                { fields.length ? (
                    <VStack gap={8} max align='center'>
                        <h2>Выбор порядка полей шаблона</h2>
                        <VStack max className={s.reorderListWrapper}>
                            <Reorder.Group 
                                as='ol' 
                                values={fields} 
                                onReorder={handleSelectedFields}
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
                ) : (
                    <div>Поля не выбраны</div>
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default ChangeSampleFieldsOrderPage;