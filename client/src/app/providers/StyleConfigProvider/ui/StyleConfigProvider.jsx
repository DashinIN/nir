import { ConfigProvider } from 'antd';

export const StyleConfigProvider = ({children}) => {
    return(
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorTextPlaceholder: '#5c5c5c', 
                    },
                }
            }}
        >
            {children}
        </ConfigProvider>

    );
};