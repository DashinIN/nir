import { CheckboxItem } from '../CheckboxItem/CheckboxItem';
import s from './FieldsList.module.scss';

export const FieldsList = ({fields, items, setItems}) => {

    const handleCheckboxChange = (field) => {
        if (items.includes(field)) {
            setItems(items.filter(item => item !== field));
        } else {
            setItems([...items, field]);
        }
    };

    return (
        <>  
            <div className={s.fieldsWrapper}>
                {fields.map((field, index) => (
                    <CheckboxItem 
                        key={index} 
                        label={field}
                        changeHandler={() => handleCheckboxChange(field)}
                        handleCheck={items.includes(field)}
                    />
                ))}
            </div>
        </>
    );
};
