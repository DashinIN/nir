import { SelectListItem } from '../SelectListItem/SelectListItem';


export const SampleSelector = ({data, selectedSample, setSelectedSample}) => {

    const selectHandler = (item) => {
        setSelectedSample(data.indexOf(item));
    };

    return (
        <>
            <h2>Список доступных шаблонов</h2>
            <div className='row'>
                <p>Название шаблона</p>
                <p>Порядок полей</p>
            </div>
            {   
                data.map(item => (
                    <SelectListItem 
                        key = {item.sample_name}
                        name={item.sample_name}
                        onSelect={() => selectHandler(item)}
                        isSelected = {data.indexOf(item) === selectedSample}
                        content={item.sample_content.join(', ')} 
                    />
                ))
            }
        </>
    );
};
