import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const donationApiRoutes = {
    POST_prepareDonationForProject: {
        authorized: true,
        method: 'POST',
        path: 'v1/donation/:projectId',
    },
    GET_projectDonationStats: {
        authorized: true,
        method: 'GET',
        path: 'v1/donation/:projectId/stats',
    },
} satisfies { [key: string]: ApiRoute };
