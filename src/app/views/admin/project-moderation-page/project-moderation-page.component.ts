import { Component } from '@angular/core';
import { ProjectDto } from 'src/app/dtos/project.dto';
import { AssetType } from 'src/app/enums/asset-type.enum';

@Component({
    selector: 'app-project-moderation-page',
    templateUrl: './project-moderation-page.component.html',
    styleUrls: ['./project-moderation-page.component.scss'],
})
export class ProjectModerationPageComponent {
    projectDto: ProjectDto = {
        id: 5,
        name: 'Projekt rakiety studenckiej',
        shortDescription: 'Projekt rakiety studenckiej we współpracy z SpaceX.',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        fundingObjectives: '',
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
}
