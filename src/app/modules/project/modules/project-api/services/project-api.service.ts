import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchQueryParamsDto } from 'src/app/dtos/search-query-params.dto';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { projectApiRoutes } from '../project-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { SearchResultsDto } from 'src/app/dtos/search-results.dto';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';
import { ProjectDto } from 'src/app/dtos/project.dto';
import { UpdateProjectDto } from 'src/app/dtos/update-project.dto';
import { CreateProjectDto } from 'src/app/dtos/create-project.dto';
import { OpenPositionForProjectDto } from '../dtos/open-position-for-project.dto';
@Injectable({
    providedIn: 'root',
})
export class ProjectApiService {
    constructor(private readonly apiService: CoreApiService) {}

    searchProjects(
        params: SearchQueryParamsDto,
        page: number,
        resultsPerPage: number
    ) {
        const httpParams: { [key: string]: string | number } = {};

        if (params.query !== undefined) {
            httpParams['query'] = params.query;
        }
        if (params.category !== undefined && params.category !== -1) {
            httpParams['category'] = params.category;
        }
        if (params.sort !== undefined) {
            httpParams['sort'] = params.sort;
        }

        return this.apiService.request<SearchResultsDto>(
            projectApiRoutes.GET_searchProjects,
            new ApiOptions({
                params: new HttpParams({
                    fromObject: {
                        ...httpParams,
                        ...new PaginationDto({
                            page,
                            elementsPerPage: resultsPerPage,
                        }),
                    },
                }),
            }) as ApiOptionsBody
        );
    }

    getProjects() {
        return this.apiService.request<SimpleProjectDto[]>(
            projectApiRoutes.GET_projects
        );
    }

    getProjectById(projectId: number) {
        return this.apiService.request<ProjectDto>(
            projectApiRoutes.GET_projectById,
            new ApiOptions({ routeParams: { projectId } }) as ApiOptionsBody
        );
    }

    getOrganizationProjects(organizationId: number) {
        return this.apiService.request<SimpleProjectDto[]>(
            projectApiRoutes.GET_organizationProjects,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    getOrganizationOpenPositions(organizationId: number) {
        return this.apiService.request<OpenPositionForProjectDto[]>(
            projectApiRoutes.GET_organizationOpenPositions,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    updateProject(
        projectId: number,
        updateProjectDto: UpdateProjectDto,
        newAssets: File[]
    ) {
        return this.apiService.request<FormData, void>(
            projectApiRoutes.PATCH_project,
            this.getFormDataFromCreateOrUpdateProjectDto(
                updateProjectDto,
                newAssets
            ),
            new ApiOptions({
                routeParams: { projectId },
            }) as ApiOptionsBody
        );
    }

    removeProject(projectId: number) {
        return this.apiService.request<void>(
            projectApiRoutes.DELETE_project,
            new ApiOptions({
                routeParams: { projectId },
            }) as ApiOptionsBody
        );
    }

    getOrganizationProjectDrafts(organizationId: number) {
        return this.apiService.request<SimpleProjectDto[]>(
            projectApiRoutes.GET_organizationProjectDrafts,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    getProjectDraftById(draftId: number) {
        return this.apiService.request<ProjectDto>(
            projectApiRoutes.GET_projectDraftById,
            new ApiOptions({ routeParams: { draftId } }) as ApiOptionsBody
        );
    }

    createProjectDraft(
        organizationId: number,
        createProjectDto: CreateProjectDto,
        newAssets: File[]
    ) {
        return this.apiService.request<FormData, void>(
            projectApiRoutes.POST_projectDraft,
            this.getFormDataFromCreateOrUpdateProjectDto(
                createProjectDto,
                newAssets
            ),
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    updateProjectDraft(
        draftId: number,
        updateProjectDto: UpdateProjectDto,
        newAssets: File[]
    ) {
        return this.apiService.request<FormData, void>(
            projectApiRoutes.PATCH_editProjectDraft,
            this.getFormDataFromCreateOrUpdateProjectDto(
                updateProjectDto,
                newAssets
            ),
            new ApiOptions({
                routeParams: { draftId },
            }) as ApiOptionsBody
        );
    }

    getNewestProjects() {
        return this.apiService.request<SimpleProjectDto[]>(
            projectApiRoutes.GET_newestProjects
        );
    }

    getMostLikedProjects() {
        return this.apiService.request<SimpleProjectDto[]>(
            projectApiRoutes.GET_favoriteProjects
        );
    }

    private getFormDataFromCreateOrUpdateProjectDto(
        createOrUpdateProjectDto: CreateProjectDto | UpdateProjectDto,
        newAssets: File[]
    ) {
        const formData = new FormData();

        formData.append('name', createOrUpdateProjectDto.name);
        formData.append(
            'shortDescription',
            createOrUpdateProjectDto.shortDescription
        );
        formData.append('description', createOrUpdateProjectDto.description);
        formData.append(
            'fundingObjectives',
            createOrUpdateProjectDto.fundingObjectives ?? ''
        );
        formData.append(
            'assets',
            JSON.stringify(createOrUpdateProjectDto.assets)
        );
        formData.append(
            'categories',
            JSON.stringify(createOrUpdateProjectDto.categories)
        );
        formData.append(
            'openPositions',
            JSON.stringify(createOrUpdateProjectDto.openPositions)
        );

        newAssets.forEach((asset) => {
            formData.append('fileAssets', asset);
        });

        return formData;
    }
}
