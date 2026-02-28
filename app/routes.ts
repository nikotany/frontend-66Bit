import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/', "routes/LayoutPages.tsx", [
        index('routes/ListUsers.tsx'),
        route('/employee/:employeeId', 'routes/User.tsx'),
        route('*', 'routes/NotFound.tsx')
    ])
] satisfies RouteConfig;
