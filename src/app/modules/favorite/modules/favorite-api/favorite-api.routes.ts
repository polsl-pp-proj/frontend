import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const favoriteApiRoutes = {
    GET_simpleFavorites: {
        authorized: true,
        method: 'GET',
        path: 'v1/favorite/simple',
    },
    POST_addToFavorites: {
        authorized: true,
        path: `/v1/favorite/:projectId`,
        method: 'POST',
    },
    DELETE_removeFromFavorites: {
        authorized: true,
        path: `/v1/favorite/:projectId`,
        method: 'DELETE',
    },
} satisfies { [key: string]: ApiRoute };
