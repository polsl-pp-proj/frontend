import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JoinTeamModalComponent } from 'src/app/components/modals/join-team-modal/join-team-modal.component';
import { OpenPositionDto } from 'src/app/dtos/open-position.dto';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';
import { OpenPositionForProjectDto } from 'src/app/modules/project/modules/project-api/dtos/open-position-for-project.dto';
import { ProjectService } from 'src/app/modules/project/services/project.service';

@Component({
    selector: 'app-organization-page',
    templateUrl: './organization-page.component.html',
    styleUrls: ['./organization-page.component.scss'],
})
export class OrganizationPageComponent implements OnInit {
    organizationId = -1;
    organizationName = 'Trwa ładowanie...';
    isMember!: boolean;
    isOwner!: boolean;

    organizationProjects: SimpleProjectDto[] = [];

    openPositions: OpenPositionForProjectDto[] = [];

    chosenOpenPosition: OpenPositionForProjectDto = {
        id: -1,
        name: 'Ładowanie...',
        projectId: -1,
        projectName: 'Ładowanie...',
        description: 'Ładowanie...',
        requirements: ['Ładowanie...'],
    };

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly organizationService: OrganizationService,
        private readonly router: Router,
        private readonly toastrService: ToastrService,
        private readonly authService: AuthService,
        private readonly projectService: ProjectService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {
        const organizationId =
            this.activatedRoute.snapshot.paramMap.get('organizationId');
        if (organizationId) {
            this.organizationId = +organizationId;
            this.organizationService
                .getOrganization(this.organizationId)
                .subscribe({
                    next: (organization) => {
                        this.organizationName = organization.name;
                    },
                    error: () => {
                        this.router.navigate(['/']);
                        this.toastrService.info(
                            'Odwiedzona przez Ciebie organizacja nie istnieje!',
                            'Organizacja nie istnieje'
                        );
                    },
                });
            this.authService.authTokenPayload.subscribe(
                (authTokenPayload: AuthTokenPayloadDto | null | undefined) => {
                    if (authTokenPayload) {
                        const userOrganization =
                            authTokenPayload.organizations.find(
                                (org: { organizationId: number }) =>
                                    org.organizationId === this.organizationId
                            );

                        if (userOrganization) {
                            this.isMember = true;
                            this.isOwner =
                                userOrganization.role ===
                                OrganizationMemberRole.Owner;
                        }
                    }
                }
            );
            this.projectService
                .getOrganizationProjects(this.organizationId)
                .subscribe(
                    (projects) => (this.organizationProjects = projects)
                );
            this.projectService
                .getOrganizationOpenPositions(this.organizationId)
                .subscribe(
                    (openPositions) => (this.openPositions = openPositions)
                );

            return;
        }
        this.router.navigate(['/']);
    }

    visitProject(projectId: number) {
        this.router.navigate(['/project', projectId]);
    }

    openJoinTeamModal(openPosition: OpenPositionForProjectDto) {
        this.chosenOpenPosition = openPosition;
        this.modalService.updateModalState(
            JoinTeamModalComponent.ModalName,
            'open'
        );
    }
}
