import { useDispatch, useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { FieldsSelector, fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';
import { editActions, editReducer } from '@/pages/EditSamplePage/model/slice/editSlice';
import { getEditSample, getIsEdit } from '@/pages/EditSamplePage/model/selectors/getIsEdit';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAllSamples, useSample } from '@/entities/Sample/api/sampleApi';
import { useEffect } from 'react';
import { Loader } from '@/shared/ui/Loader';

const initialReducers = {
    fields: fieldsReducer,
    edit: editReducer
};

const SelectSampleFieldsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fields = useSelector(getFields);
    const isEdit = useSelector(getIsEdit);
    const editSampleId = useSelector(getEditSample);

    const {data: sampleData, isLoading: sampleDataLoading} = useSample(editSampleId);

    const {
        data: allSamples,
        isLoading: samplesLoading
    } = useAllSamples();

    const handleSelectedFields = (selectedFields) => {
        const newFields = [];
        selectedFields.forEach(selectedField => {
            const existingField = fields.find(field => field.name === selectedField);
            if (!existingField) {
                newFields.push({ name: selectedField, rights: 'USER' });
            }
        });
        const combinedFields = fields.concat(newFields);
        const filteredFields = combinedFields.filter(field => selectedFields.includes(field.name));
        console.log('budet ', filteredFields);
        dispatch(fieldsActions.setFields(filteredFields));
    };

    useEffect(() => {
        if (sampleData && fields.length) {
            const initialData = sampleData.fields.map(field => ({ name: field.name, rights: field.rights }));
            const modifiedData = fields.map(field => ({ name: field.name, rights: field.rights }));
            const editedCondition =  JSON.stringify(initialData) !== JSON.stringify(modifiedData);
            dispatch(editActions.setIsEdit(editedCondition));
        }
    }, [dispatch, fields, sampleData]);

    const handleEdit = () => {
        editSampleId ? navigate(`/editSample/${editSampleId}`) : navigate('/changeSampleFieldsOrder');
    };

    if(sampleDataLoading ||samplesLoading ) {
        return (<Loader />);
    }

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                {editSampleId && <h2>редактирование шаблона {allSamples.find(sample => sample.sample_id === parseInt(editSampleId))?.sample_name}</h2>}
                <FieldsSelector 
                    items={fields.map(item => item.name)} 
                    setItems={handleSelectedFields}
                />
                <Button size='large' type='primary' onClick={handleEdit}>Поменять порядок</Button>
            </Page>
        </DynamicModuleLoader>
    );
};

export default SelectSampleFieldsPage;