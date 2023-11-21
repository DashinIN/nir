import { Flex } from '../Flex/Flex';

export const VStack = (props) => {
    const { align = 'start' } = props;
    return (
        <Flex {...props} direction="column" align={align} />
    );
};

