import { useDispatch, useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';
import { ReorderList } from '@/widgets/ReorderList';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/Stack';
import { Button } from 'antd';


const initialReducers = {
    fields: fieldsReducer,
};

const ChangeSampleFieldsOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fields = useSelector(getFields);

    const handleSelectedFields = (selectedFields) => {
        dispatch(fieldsActions.setFields(selectedFields));
    };

    const handleChange = (item, value) => {
        const newData = {
            name: item.name, 
            rights: value
        };
        dispatch(fieldsActions.updateField(newData));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                { fields.length ? (
                    <>
                        <HStack max justify='between'>
                            <Button size='large'onClick={() => navigate('/selectSampleFields')}>Изменить выбранные поля</Button>
                            <Button size='large' type='primary'  onClick={() => navigate('/saveSample   ')}>Сохранение шаблона</Button>
                        </HStack>
                        <ReorderList
                            fields={fields} 
                            setFields={handleSelectedFields}
                            handleChange={handleChange}
                        />
                    </>
                ) : (
                    <div>Поля не выбраны</div>
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default ChangeSampleFieldsOrderPage;