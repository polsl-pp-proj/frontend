import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const organizationApiRoutes = {
    GET_allOrganizations: {
        authorized: false,
        method: 'GET',
        path: 'v1/organization',
    },
    GET_organization: {
        authorized: false,
        method: 'GET',
        path: 'v1/organization/:organizationId',
    },
    GET_ownOrganizations: {
        authorized: true,
        method: 'GET',
        path: 'v1/organization/own',
    },
    GET_fullOrganization: {
        authorized: true,
        method: 'GET',
        path: 'v1/organization/:organizationId/full',
    },
    POST_createOrganization: {
        authorized: true,
        method: 'POST',
        path: 'v1/organization',
    },
    GET_organizationMembers: {
        authorized: true,
        method: 'GET',
        path: 'v1/organization/:organizationId/member',
    },
    POST_addOrganizationMembers: {
        authorized: true,
        method: 'POST',
        path: 'v1/organization/:organizationId/member',
    },
    DELETE_removeOrganizationMembers: {
        authorized: true,
        method: 'DELETE',
        path: 'v1/organization/:organizationId/member',
    },
} satisfies { [key: string]: ApiRoute };
