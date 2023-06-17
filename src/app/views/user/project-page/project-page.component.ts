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
import { OpenPositionDto } from 'src/app/dtos/open-position.dto';
import { PaymentDto } from 'src/app/dtos/payment.dto';
import { ProjectDto } from 'src/app/dtos/project.dto';
import { AssetType } from 'src/app/enums/asset-type.enum';
import { HelpService } from 'src/app/modules/help/services/help.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { FavoriteService } from 'src/app/modules/favorite/services/favorite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
        projectGroupName: 'SKN SpaceLauncher',
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

        createdAt: 121,
        updatedAt: 122,
    };

    openPositionDtos: OpenPositionDto[] = [
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
    ];

    recentPaymentsDtos: PaymentDto[] = [
        {
            userName: 'Grzegorz',
            amount: 250,
        },
        {
            userName: 'Mateusz',
            amount: 310,
        },
        {
            userName: 'Tomek',
            amount: 99,
        },
    ];

    projectId: number = -1;
    isFavorite = false;

    subSink: Subscription[] = [];

    constructor(
        private readonly helpService: HelpService,
        private readonly modalService: ModalService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly favoriteService: FavoriteService
    ) {}

    async ngOnInit() {
        this.helpService.registerPageHelp('user/project-page');
        const projectId =
            this.activatedRoute.snapshot.paramMap.get('projectId');
        if (!projectId) {
            await this.router.navigate(['/404']);
            return;
        }
        this.projectId = +projectId;

        this.subSink.push(
            this.favoriteService.isFavorite(this.projectId).subscribe({
                next: (isFavorite) => (this.isFavorite = isFavorite),
            })
        );
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
}
