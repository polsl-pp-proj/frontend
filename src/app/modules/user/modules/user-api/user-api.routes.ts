import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const userApiRoutes = {
    GET_users: {
        authorized: true,
        method: 'GET',
        path: 'v1/user',
    },
    GET_user: {
        authorized: true,
        method: 'GET',
        path: 'v1/user/:userId',
    },
    PATCH_updateUser: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/user/:userId',
    },
    DELETE_removeUser: {
        authorized: true,
        method: 'DELETE',
        path: 'v1/user/:userId',
    },
} satisfies { [key: string]: ApiRoute };
