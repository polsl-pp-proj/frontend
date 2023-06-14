import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const studentshipApiRoutes = {
    POST_requestVerification: {
        authorized: true,
        method: 'POST',
        path: 'v1/studentship/verification/request',
    },
    PATCH_confirmVerification: {
        authorized: false,
        method: 'PATCH',
        path: 'v1/studentship/verification/confirm/:emailAddress/:token',
    },
} satisfies { [key: string]: ApiRoute };
