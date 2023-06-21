import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { PaymentModalComponent } from 'src/app/components/modals/payment-modal/payment-modal.component';
import { MessageModalComponent } from 'src/app/components/modals/message-modal/message-modal.component';
import { PaymentDto } from 'src/app/dtos/payment.dto';
import { ProjectDto } from 'src/app/dtos/project.dto';
import { AssetType } from 'src/app/enums/asset-type.enum';
import { HelpService } from 'src/app/modules/help/services/help.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { ProjectService } from 'src/app/modules/project/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoriteService } from 'src/app/modules/favorite/services/favorite.service';
import { Subscription, skipWhile } from 'rxjs';
import { OpenPositionForProjectDto } from 'src/app/modules/project/modules/project-api/dtos/open-position-for-project.dto';
import { JoinTeamModalComponent } from 'src/app/components/modals/join-team-modal/join-team-modal.component';
import { OpenPositionDto } from 'src/app/dtos/open-position.dto';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DonationService } from 'src/app/modules/donation/services/donation.service';
import { DonationStatsDto } from 'src/app/modules/donation/modules/donation-api/dtos/donation-stats.dto';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit, OnDestroy {
    projectDto: ProjectDto = {
        id: 5,
        name: 'Projekt rakiety studenckiej',
        shortDescription: 'Projekt rakiety studenckiej we współpracy z SpaceX.',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        fundingObjectives: 'Zbieramy na twittera',
        organizationId: -1,
        organizationName: 'SKN SpaceLauncher',
        assets: [
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
        ],

        categories: [
            {
                id: 1,
                name: 'biotechnologia',
            },
        ],
        openPositions: [
            {
                id: 67,
                name: 'Full stack developer',
                description:
                    'Full Stack Developer będzie zajmował się stworzeniem aplikacji internetowej do monitorowania aktualnego stanu zielonej architektury.',
                requirements: ['Angular', 'Java', 'NodeJS', 'C++'],
            },
            {
                id: 67,
                name: 'Full stack developer',
                description:
                    'Full Stack Developer będzie zajmował się stworzeniem aplikacji internetowej do monitorowania aktualnego stanu zielonej architektury.',
                requirements: ['Angular', 'Java', 'NodeJS', 'C++'],
            },
            {
                id: 67,
                name: 'Full stack developer',
                description:
                    'Full Stack Developer będzie zajmował się stworzeniem aplikacji internetowej do monitorowania aktualnego stanu zielonej architektury.',
                requirements: ['Angular', 'Java', 'NodeJS', 'C++'],
            },
        ],

        createdAt: 121,
        updatedAt: 122,
    };

    donationStats: DonationStatsDto = {
        lastFunders: [],
        raised: { lastMonth: 0, total: 0 },
    };

    projectId: number = -1;
    isLogged = false;
    isFavorite = false;
    isStudent = false;

    subSink: Subscription[] = [];

    chosenOpenPosition: OpenPositionForProjectDto = {
        id: -1,
        name: 'Ładowanie...',
        projectId: -1,
        projectName: 'Ładowanie...',
        description: 'Ładowanie...',
        requirements: ['Ładowanie...'],
    };

    usersOrganizationIds: number[] = [];

    get isUserPartOfProject() {
        return this.usersOrganizationIds.some(
            (id) => id === this.projectDto.organizationId
        );
    }

    constructor(
        private readonly helpService: HelpService,
        private readonly modalService: ModalService,
        private readonly projectService: ProjectService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly toastrService: ToastrService,
        private readonly favoriteService: FavoriteService,
        private readonly authService: AuthService,
        private readonly donationService: DonationService
    ) {}

    async ngOnInit() {
        this.helpService.registerPageHelp('user/project-page');
        const projectId =
            this.activatedRoute.snapshot.paramMap.get('projectId');
        if (projectId) {
            this.projectId = +projectId;
            this.projectService.getProjectById(this.projectId).subscribe({
                next: (projectDto) => {
                    this.projectDto = projectDto;
                },
                error: () => {
                    this.router.navigate(['/404']);
                    this.toastrService.info(
                        'Odwiedzony przez Ciebie projekt nie istnieje!',
                        'Projekt nie istnieje'
                    );
                },
            });
            this.donationService
                .getProjectDonationStats(this.projectId)
                .subscribe((stats) => (this.donationStats = stats));
            this.subSink.push(
                this.favoriteService.isFavorite(this.projectId).subscribe({
                    next: (isFavorite) => (this.isFavorite = isFavorite),
                }),
                this.authService.authTokenPayload
                    .pipe(skipWhile((payload) => payload === undefined))
                    .subscribe((payload) => {
                        this.isLogged = !!payload;
                        this.isStudent = payload?.isVerifiedStudent ?? false;
                        this.usersOrganizationIds =
                            payload?.organizations.map(
                                (org) => org.organizationId
                            ) ?? [];
                    })
            );
            return;
        }
        this.router.navigate(['/']);
    }

    ngOnDestroy(): void {
        this.subSink.forEach((sub) => sub.unsubscribe());
    }

    makeDonation() {
        this.modalService.updateModalState(
            PaymentModalComponent.ModalName,
            'open'
        );
    }

    openMessageModal() {
        this.modalService.updateModalState(
            MessageModalComponent.ModalName,
            'open'
        );
    }

    openJoinTeamModal(openPosition: OpenPositionDto) {
        this.chosenOpenPosition = {
            ...openPosition,
            projectId: this.projectDto.id,
            projectName: this.projectDto.name,
        };
        this.modalService.updateModalState(
            JoinTeamModalComponent.ModalName,
            'open'
        );
    }

    toggleFavoriteState() {
        if (this.isFavorite) {
            this.removeFromFavorites();
        } else {
            this.addToFavorites();
        }
    }

    private addToFavorites() {
        this.favoriteService.addToFavorites(this.projectId).subscribe();
    }

    private removeFromFavorites() {
        this.favoriteService.removeFromFavorites(this.projectId).subscribe();
    }

    remoteAssetsPath = environment.remoteAssetsPath;
}
