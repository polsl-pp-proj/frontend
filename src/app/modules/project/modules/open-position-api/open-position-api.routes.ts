import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const projectApiRoutes = {
    GET_organizationOpenPositions: {
        authorized: false,
        path: '/v1/project/open-position/organization/:organizationId',
        method: 'GET',
    },
    POST_applyForOpenPosition: {
        authorized: true,
        path: '/v1/project/open-position/apply/:openPositionId',
        method: 'POST',
    },
} satisfies { [key: string]: ApiRoute };
