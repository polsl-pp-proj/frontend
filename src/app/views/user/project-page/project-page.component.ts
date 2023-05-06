import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectDto } from 'src/app/dtos/project-dto';
import { AssetType } from 'src/app/enums/asset-type.enum';
import Swiper from 'swiper';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent {
    projectDto: ProjectDto = {
        id: 5,
        name: 'Browar studencki',
        shortDescription: 'Projekt browaru zaopatrującego igry w piwooo',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        projectGroupName: 'Browamators',
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

    constructor() {}
}
