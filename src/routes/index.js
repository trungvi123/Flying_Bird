import routes from '../config/routeConfig';
import { Home, Detail, Catalog } from '../pages';

export const publicRoute = [
    { path: routes.home, element: <Home></Home> },
    { path: routes.catalogSreach, element: <Catalog></Catalog> },
    { path: routes.catalogDefault, element: <Catalog></Catalog> },
    { path: routes.detail, element: <Detail></Detail> },
];

export const privateRoute = [];
