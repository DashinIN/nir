import MainPage from '@/pages/MainPage';
import ChangeSamplePage from '@/pages/ChangeSamplePage';
import UseSamplePage from '@/pages/UseSamplePage/ui/UseSamplePage';
import ViewSamplePage from '@/pages/ViewSamplePage';
import ChangeSampleFieldsOrderPage from '@/pages/ChangeSampleFieldsOrderPage';
import SelectSampleFieldsPage from '@/pages/SelectSampleFieldsPage';
import SaveSamplePage from '@/pages/SaveSamplePage';
import EditSamplePage from '@/pages/EditSamplePage/ui/EditSamplePage.async';


export const routeConfig = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/changeSampleFieldsOrder',
        element: <ChangeSampleFieldsOrderPage />,
        roles: ['ADMIN']
    },
    {
        path: '/selectSampleFields',
        element: <SelectSampleFieldsPage />,
    },
    {
        path: '/saveSample',
        element: <SaveSamplePage />,
        roles: ['ADMIN']
    },
    {
        path: '/editSample/:id',
        element:  <EditSamplePage />,
        roles: ['ADMIN']
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