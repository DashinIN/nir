import { useDispatch, useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { message } from 'antd';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';
import { useParams } from 'react-router-dom';
import { ReorderList } from '@/widgets/ReorderList';
import { useEditSample, useSample } from '@/entities/Sample/api/sampleApi';
import { useState, useEffect } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { Button } from 'antd';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useNavigate } from 'react-router-dom';

const initialReducers = {
    fields: fieldsReducer,
};

const EditSamplePage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const {data: sampleData, isLoading, refetch: refetchSample} = useSample(id);
    const [ updateSample ] = useEditSample();

    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fields = useSelector(getFields) || [];

    useEffect(() => {
        sampleData && dispatch(fieldsActions.setFields(sampleData.fields));
    }, [dispatch, sampleData]);

    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if (sampleData) {
            const initialData = sampleData.fields.map(field => ({ name: field.name, rights: field.rights }));
            const modifiedData = fields.map(field => ({ name: field.name, rights: field.rights }));
            setIsModified(JSON.stringify(initialData) !== JSON.stringify(modifiedData));
        }
    }, [sampleData, fields]);

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

    const handleCancel = async () => {
        dispatch(fieldsActions.setFields(sampleData.fields));
    };

    const handleSave = async () => {
        const data = { name: sampleData.name, items: fields };
        try {
            const updateData = await updateSample({id, data});
            await refetchSample();
            message.success(updateData.data.message); 
            navigate('/changeSample');
        } catch (error) {
            message.error('Ошибка при редактировании шаблона');
            console.error('Ошибка при редактировании шаблона:', error);
        }
    };

    if(isLoading) {
        return(<Loader />);
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Page>  
                {sampleData && (
                    <VStack gap={16}>
                        <ReorderList
                            fields={fields} 
                            setFields={handleSelectedFields}
                            handleChange={handleChange}
                        />
                        {isModified && (
                            <HStack max justify='center' gap={8}>
                                <Button size='large'  onClick={handleCancel}>Отмена</Button>
                                <Button size='large' type='primary' onClick={handleSave}>Сохранить изменения</Button>
                            </HStack>
                        )}
                    </VStack>
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default EditSamplePage;