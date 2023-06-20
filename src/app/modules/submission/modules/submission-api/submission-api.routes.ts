import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const submissionApiRoutes = {
    GET_submissions: {
        authorized: true,
        method: 'GET',
        path: 'v1/project/draft/submission',
    },
    GET_submission: {
        authorized: true,
        method: 'GET',
        path: 'v1/project/draft/submission/:submissionId',
    },
    PATCH_publishSubmission: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/project/draft/submission/:submissionId/publish',
    },
    PATCH_rejectSubmission: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/project/draft/submission/:submissionId/reject',
    },
} satisfies { [key: string]: ApiRoute };
