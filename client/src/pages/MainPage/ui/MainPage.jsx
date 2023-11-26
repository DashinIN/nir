import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    return (
        <Page>
            <h1>Главная страница</h1>
            <Counter />
        </Page>
    );
};

export default MainPage;