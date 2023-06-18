import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const projectApiRoutes = {
    GET_searchProjects: {
        authorized: false,
        path: '/v1/project/search',
        method: 'GET',
    },
    GET_projects: {
        authorized: false,
        path: `/v1/project`,
        method: 'GET',
    },
    GET_projectById: {
        authorized: false,
        path: `/v1/project/:projectId`,
        method: 'GET',
    },
    GET_organizationProjects: {
        authorized: false,
        path: '/v1/project/organization/:organizationId',
        method: 'GET',
    },
    PATCH_project: {
        authorized: true,
        path: '/v1/project/:projectId',
        method: 'PATCH',
    },
    DELETE_project: {
        authorized: true,
        path: '/v1/project/:projectId',
        method: 'DELETE',
    },
    GET_organizationProjectDrafts: {
        authorized: true,
        path: '/v1/project/draft/organization/:organizationId',
        method: 'GET',
    },
    GET_projectDraftById: {
        authorized: true,
        path: `/v1/project/draft/:draftId`,
        method: 'GET',
    },
    POST_projectDraft: {
        authorized: true,
        path: '/v1/project/draft/organization/:organizationId',
        method: 'POST',
    },
    PATCH_editProjectDraft: {
        authorized: true,
        path: '/v1/project/draft/:draftId',
        method: 'PATCH',
    },
    GET_newestProjects: {
        authorized: false,
        path: `/v1/project/newest`,
        method: 'GET',
    },
    GET_favoriteProjects: {
        authorized: false,
        path: `/v1/project/favorite`,
        method: 'GET',
    },
} satisfies { [key: string]: ApiRoute };
