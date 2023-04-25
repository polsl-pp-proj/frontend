import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const authApiRoutes = {
    POST_login: { authorized: false, method: 'POST', path: 'v1/auth/login' },
    PATCH_refresh: {
        authorized: false,
        method: 'PATCH',
        path: 'v1/auth/refresh',
    },
    DELETE_logout: {
        authorized: false,
        method: 'DELETE',
        path: 'v1/auth/logout',
    },
    DELETE_logoutAll: {
        authorized: false,
        method: 'DELETE',
        path: 'v1/auth/logout/all',
    },
    POST_requestPasswordReset: {
        authorized: false,
        method: 'POST',
        path: 'v1/auth/password/reset',
    },
    PATCH_confirmPasswordReset: {
        authorized: false,
        method: 'PATCH',
        path: 'v1/auth/password/reset/:emailAddress/:token',
    },
    PATCH_changePassword: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/auth/password/change',
    },
} satisfies { [key: string]: ApiRoute };
