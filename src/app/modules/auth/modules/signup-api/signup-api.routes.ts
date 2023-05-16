import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const signupApiRoutes = {
    POST_signup: { authorized: false, method: 'POST', path: 'v1/signup' },
    PATCH_confirmSignup: {
        authorized: false,
        method: 'PATCH',
        path: 'v1/signup/confirm/:emailAddress/:token',
    },
} satisfies { [key: string]: ApiRoute };
