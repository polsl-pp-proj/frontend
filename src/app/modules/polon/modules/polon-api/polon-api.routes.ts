import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const polonApiRoutes = {
    GET_academicInstitutions: {
        authorized: true,
        method: 'GET',
        path: 'v1/polon/academic-institutions',
    },
} satisfies { [key: string]: ApiRoute };
