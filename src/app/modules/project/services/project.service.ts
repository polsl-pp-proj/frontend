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
        return this.projectApiService
            .searchProjects(params, page, resultsPerPage)
            .pipe(
                tap((results) => {
                    results.projects.forEach(
                        (project) =>
                            (project.thumbnail.url = `${environment.remoteAssetsPath}/${project.thumbnail.url}`)
                    );
                })
            );
    }

    getProjects() {
        return this.projectApiService.getProjects().pipe(
            tap((projects) => {
                projects.forEach(
                    (project) =>
                        (project.thumbnail.url = `${environment.remoteAssetsPath}/${project.thumbnail.url}`)
                );
            })
        );
    }

    getProjectById(projectId: number) {
        return this.projectApiService
            .getProjectById(projectId)
            .pipe(
                tap((project) =>
                    project.assets.forEach(
                        (asset) =>
                            (asset.url = `${environment.remoteAssetsPath}/${asset.url}`)
                    )
                )
            );
    }

    getOrganizationProjects(organizationId: number) {
        return this.projectApiService
            .getOrganizationProjects(organizationId)
            .pipe(
                tap((projects) => {
                    projects.forEach(
                        (project) =>
                            (project.thumbnail.url = `${environment.remoteAssetsPath}/${project.thumbnail.url}`)
                    );
                })
            );
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
        return this.projectApiService
            .getOrganizationProjectDrafts(organizationId)
            .pipe(
                tap((projects) => {
                    projects.forEach(
                        (project) =>
                            (project.thumbnail.url = `${environment.remoteAssetsPath}/${project.thumbnail.url}`)
                    );
                })
            );
    }

    getProjectDraftById(draftId: number) {
        return this.projectApiService
            .getProjectDraftById(draftId)
            .pipe(
                tap((project) =>
                    project.assets.forEach(
                        (asset) =>
                            (asset.url = `${environment.remoteAssetsPath}/${asset.url}`)
                    )
                )
            );
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
        return this.projectApiService.getNewestProjects().pipe(
            tap((projects) => {
                projects.forEach(
                    (project) =>
                        (project.thumbnail.url = `${environment.remoteAssetsPath}/${project.thumbnail.url}`)
                );
            })
        );
    }

    getMostLikedProjects() {
        return this.projectApiService.getMostLikedProjects().pipe(
            tap((projects) => {
                projects.forEach(
                    (project) =>
                        (project.thumbnail.url = `${environment.remoteAssetsPath}/${project.thumbnail.url}`)
                );
            })
        );
    }
}
