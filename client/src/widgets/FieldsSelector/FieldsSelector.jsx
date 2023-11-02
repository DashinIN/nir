import { CheckboxItem } from '@/shared/ui/CheckboxItem/CheckboxItem';
import s from './FieldsSelector.module.scss';

export const FieldsSelector = ({fields, items, setItems}) => {

    const handleCheckboxChange = (field) => {
        if (items.includes(field)) {
            setItems(items.filter(item => item !== field));
        } else {
            setItems([...items, field]);
        }
    };

    return (
        <>
            <h2>Отметьте требуемые поля</h2>
            <div className={s.fieldsWrapper}>
                {fields.map((field, index) => (
                    <CheckboxItem 
                        key={index} 
                        label={field}
                        handleCheckboxChange={() => handleCheckboxChange(field)}
                        handleCheck={items.includes(field)}
                    />
                ))}
            </div>
        </>
    );
};
