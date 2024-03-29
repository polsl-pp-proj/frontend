import { Injectable } from '@angular/core';
import { ProjectApiService } from '../modules/project-api/services/project-api.service';
import { CreateProjectDto } from 'src/app/dtos/create-project.dto';
import { SearchQueryParamsDto } from 'src/app/dtos/search-query-params.dto';
import { UpdateProjectDto } from 'src/app/dtos/update-project.dto';
import { ProjectMessageDto } from '../modules/project-api/dtos/project-message.dto';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const resultsPerPage = 6;

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private readonly projectApiService: ProjectApiService) {}

    searchProjects(params: SearchQueryParamsDto, page: number = 1) {
        return this.projectApiService.searchProjects(
            params,
            page,
            resultsPerPage
        );
    }

    getProjects() {
        return this.projectApiService.getProjects();
    }

    getProjectById(projectId: number) {
        return this.projectApiService.getProjectById(projectId);
    }

    getOrganizationProjects(organizationId: number) {
        return this.projectApiService.getOrganizationProjects(organizationId);
    }

    updateProject(
        projectId: number,
        updateProjectDto: UpdateProjectDto,
        newAssets: File[]
    ) {
        return this.projectApiService.updateProject(
            projectId,
            updateProjectDto,
            newAssets
        );
    }

    removeProject(projectId: number) {
        return this.projectApiService.removeProject(projectId);
    }

    sendProjectMessage(projectId: number, message: ProjectMessageDto) {
        return this.projectApiService.sendProjectMessage(projectId, message);
    }

    getOrganizationProjectDrafts(organizationId: number) {
        return this.projectApiService.getOrganizationProjectDrafts(
            organizationId
        );
    }

    getProjectDraftById(draftId: number) {
        return this.projectApiService.getProjectDraftById(draftId);
    }

    createProjectDraft(
        organizationId: number,
        createProjectDto: CreateProjectDto,
        newAssets: File[]
    ) {
        return this.projectApiService.createProjectDraft(
            organizationId,
            createProjectDto,
            newAssets
        );
    }

    updateProjectDraft(
        draftId: number,
        updateProjectDto: UpdateProjectDto,
        newAssets: File[]
    ) {
        return this.projectApiService.updateProjectDraft(
            draftId,
            updateProjectDto,
            newAssets
        );
    }

    getNewestProjects() {
        return this.projectApiService.getNewestProjects();
    }

    getMostLikedProjects() {
        return this.projectApiService.getMostLikedProjects();
    }
}
