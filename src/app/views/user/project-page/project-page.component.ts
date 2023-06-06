import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MessageModalComponent } from 'src/app/components/modals/message-modal/message-modal.component';
import { OpenPositionDto } from 'src/app/dtos/open-position-dto';
import { PaymentDto } from 'src/app/dtos/payment-dto';
import { ProjectDto } from 'src/app/dtos/project-dto';
import { AssetType } from 'src/app/enums/asset-type.enum';
import { HelpService } from 'src/app/modules/help/services/help.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import Swiper from 'swiper';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
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

    constructor(
        private readonly helpService: HelpService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.helpService.registerPageHelp('user/project-page');
    }

    openMessageModal() {
        this.modalService.updateModalState(
            MessageModalComponent.ModalName,
            'open'
        );
    }
}
