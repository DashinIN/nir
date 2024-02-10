import { Button } from '@/shared/ui/Button';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { getSelectedSample } from '@/entities/Sample/model/selectors/getSelectedSample';
import { useAllSamples } from '@/entities/Sample/api/sampleApi';
import { useGetSelectedSampleData } from '@/features/FileOutput/api/fileOutputApi';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { useState, useEffect } from 'react';
import { Page } from '@/widgets/Page';
import { Loader } from '@/shared/ui/Loader';


const initialReducers = {
    sample: sampleReducer,
};

const ViewSamplePage = () => {
    
    const [tableColumns, setTableColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

    const selectedSample = useSelector(getSelectedSample);
    const {data: allSamples, isSuccess } = useAllSamples();
   
    const [getSelectedSampleData, { isLoading} ]  = useGetSelectedSampleData();

    let selectedSampleName, selectedSampleTitles;
    if (isSuccess  && allSamples[selectedSample]) {
        selectedSampleName = allSamples[selectedSample].sample_name;
        selectedSampleTitles = allSamples[selectedSample].sample_content;
    } else {
        return null;
    }
    

    const getRequestTable = async () => {
        if (!selectedSampleTitles.length) {
            return;
        }
        const {data: selectedData} = await getSelectedSampleData(selectedSampleTitles);
        setTableData(selectedData);

        const columns = Object.keys(selectedData[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key,
            sorter: (a, b) => {
                if (a[key] === null || a[key] === undefined || a[key] === '') {
                    return 1;
                } else if (b[key] === null || b[key] === undefined || b[key] === '') {
                    return -1; 
                }
              
                if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                    return a[key] - b[key];
                } else {
                    return a[key].localeCompare(b[key]);
                }
            },
            sortDirections: ['descend', 'ascend'],
        }));
        setTableColumns(columns);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getRequestTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

   
    
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <Page>
                {isLoading ? <Loader /> : (
                    <Table 
                        bordered 
                        dataSource={tableData}
                        columns={tableColumns}
                        locale={{
                            emptyText: 'Нет данных',
                            filterConfirm: 'Подтвердить',
                            filterReset: 'Сброс',
                            filterTitle: 'Фильтр',
                            selectAll: 'Выбрать все',
                            selectInvert: 'Инвертировать выбор',
                            sortTitle: 'Сортировать',
                            triggerAsc: 'Нажмите, чтобы сортировать по возрастанию',
                            triggerDesc: 'Нажмите, чтобы сортировать по убыванию',
                            cancelSort: 'Нажмите, чтобы отменить сортировку',
                        }}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '50'], 
                            showSizeChanger: true,
                            locale: {
                                items_per_page: 'на странице', 
                            },
                        }}
                    />
                )}
                
            </Page>
        </DynamicModuleLoader>
    );
};

export default ViewSamplePage;