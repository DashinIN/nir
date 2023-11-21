import { SelectListItem } from '../SelectListItem/SelectListItem';
import s from './SampleSelector.module.scss';

export const SampleSelector = ({data, selectedSample, setSelectedSample}) => {

    const selectHandler = (item) => {
        setSelectedSample(data.indexOf(item));
    };

    return (
        <>
            <h2>Список доступных шаблонов</h2>
            <div className={s.row}>
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
                        content={`Количество полей: ${item.sample_content.length}`} 
                    />
                ))
            }
        </>
    );
};
