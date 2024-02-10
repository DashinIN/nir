import MainPage from '@/pages/MainPage';
import CreateSamplePage from '@/pages/CreateSamplePage';
import ChangeSamplePage from '@/pages/ChangeSamplePage';
import UseSamplePage from '@/pages/UseSamplePage/ui/UseSamplePage';
import ViewSamplePage from '@/pages/ViewSamplePage';

export const routeConfig = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/createSample',
        element: <CreateSamplePage />,
    },
    {
        path: '/changeSample',
        element: <ChangeSamplePage />,
    },
    {
        path: '/useSample',
        element:  <UseSamplePage />,
    },
    {
        path: '/viewSample',
        element:  <ViewSamplePage />,
    },
];