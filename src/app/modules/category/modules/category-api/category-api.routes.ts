import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const categoryApiRoutes = {
    GET_categories: {
        authorized: false,
        method: 'GET',
        path: 'v1/category',
    },
    POST_createCategory: {
        authorized: true,
        method: 'POST',
        path: 'v1/category',
    },
    PATCH_updateCategory: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/category/:categoryId',
    },
    DELETE_removeCategory: {
        authorized: true,
        method: 'DELETE',
        path: 'v1/category/:categoryId',
    },
} satisfies { [key: string]: ApiRoute };
