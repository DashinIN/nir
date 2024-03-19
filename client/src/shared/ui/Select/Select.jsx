import { Select as AntdSelect, Space } from 'antd';

export const Select = (props) => {
    const {options, value, onChange, placeholder} = props;
    return (
        <AntdSelect
            size='large'
            mode="multiple"
            style={{
                width: '300px',
            }}
            placeholder={placeholder}
            onChange={onChange}
            optionLabelProp="label"
            value={value}
            options={options}
            notFoundContent={ <span>Не найдено</span>}
            optionRender={(option) => (
                <Space>{option.data.label}</Space>
            )}
        />
    );};