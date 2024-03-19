import { useDispatch, useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { message } from 'antd';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';
import { useParams } from 'react-router-dom';
import { ReorderList } from '@/widgets/ReorderList';
import { useAllSamples, useEditSample, useSample } from '@/entities/Sample/api/sampleApi';
import { useEffect } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { Button } from 'antd';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useNavigate } from 'react-router-dom';
import { getIsEdit } from '../model/selectors/getIsEdit';
import { editActions, editReducer } from '../model/slice/editSlice';

const initialReducers = {
    fields: fieldsReducer,
    edit: editReducer
};

const EditSamplePage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const {data: sampleData, isLoading, refetch: refetchSample} = useSample(id);
    const [ updateSample ] = useEditSample();

    const {
        data: allSamples,
        isLoading: samplesLoading
    } = useAllSamples();

    const dispatch = useDispatch();
    const fields = useSelector(getFields);
    const isEdit = useSelector(getIsEdit);

    useEffect(() => {
        if(!isEdit) {
            dispatch(editActions.setEditSample(id));
            sampleData && dispatch(fieldsActions.setFields(sampleData.fields));
        }
    }, [dispatch, id, isEdit, sampleData]);

    
    useEffect(() => {
        if (sampleData && fields.length) {
            const initialData = sampleData.fields.map(field => ({ name: field.name, rights: field.rights }));
            const modifiedData = fields.map(field => ({ name: field.name, rights: field.rights }));
            const editedCondition =  JSON.stringify(initialData) !== JSON.stringify(modifiedData);
            dispatch(editActions.setIsEdit(editedCondition));
        }
    }, [sampleData, fields, dispatch, id, isEdit]);

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

    const handleCancel = () => {
        dispatch(fieldsActions.setFields(sampleData.fields));
    };

    const handleSave = async () => {
        const data = { name: sampleData.name, items: fields };
        try {
            const updateData = await updateSample({id, data});
            await refetchSample();
            dispatch(editActions.setIsEdit(false));
            dispatch(editActions.setEditSample(null));
            dispatch(fieldsActions.setFields([]));
            message.success(updateData.data.message); 
            navigate('/changeSample');
        } catch (error) {
            message.error('Ошибка при редактировании шаблона');
            console.error('Ошибка при редактировании шаблона:', error);
        }
    };

    const handleBack = () => {
        navigate('/changeSample');
        dispatch(editActions.setIsEdit(false));
        dispatch(editActions.setEditSample(null));
        dispatch(fieldsActions.setFields([]));
    };

    if(isLoading || samplesLoading) {
        return(<Loader />);
    }


    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                {sampleData && (
                    <VStack gap={16}>
                        <h2>редактирование шаблона {allSamples.find(sample => sample.sample_id === parseInt(id))?.sample_name}</h2>
                        <ReorderList
                            fields={fields} 
                            setFields={handleSelectedFields}
                            handleChange={handleChange}
                        />
                        <HStack max justify='center' gap={8}>
                            <Button size='large'  onClick={handleBack}>Назад</Button>
                            <Button size='large' type='primary' onClick={() => navigate('/selectSampleFields')}>Поменять поля</Button>
                        </HStack>
                        {isEdit && (
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