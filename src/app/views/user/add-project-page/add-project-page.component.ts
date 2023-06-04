import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription, skipWhile, timer } from 'rxjs';
import { ChangeablePhotoGalleryComponent } from 'src/app/components/changeable-photo-gallery/changeable-photo-gallery.component';
import { AddOpenPositionModalComponent } from 'src/app/components/modals/add-open-position-modal/add-open-position-modal.component';
import { CategoryDto } from 'src/app/dtos/category-dto';
import { NewOpenPositionDto } from 'src/app/dtos/new-open-position.dto';
import { OpenPositionDto } from 'src/app/dtos/open-position-dto';
import { AddProjectDto, ProjectDto } from 'src/app/dtos/project-dto';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import Vditor from 'vditor';

@Component({
    selector: 'app-add-project-page',
    templateUrl: './add-project-page.component.html',
    styleUrls: ['./add-project-page.component.scss'],
})
export class AddProjectPageComponent implements OnInit, OnDestroy {
    private viewInitialized = false;
    private dataFilled = false;

    descriptionVditor!: Vditor;
    @ViewChild('descriptionMdEditor', { read: ElementRef })
    descriptionMdEditorRef!: ElementRef;

    @ViewChild('photoGallery') photoGallery!: ChangeablePhotoGalleryComponent;

    fundingGoalsVditor!: Vditor;
    @ViewChild('fundingGoalsMdEditor', { read: ElementRef })
    fundingGoalsMdEditorRef!: ElementRef;

    newAssets: File[] = [];
    authPayloadSubscription!: Subscription;
    payload!: AuthTokenPayloadDto;
    categories: CategoryDto[] = [];
    mappedCategories: {
        text: string;
        value: number;
    }[] = [];
    shortDescriptionInputSize: number = 0;
    maxShortDescriptionInputSize: number = 150;
    addProjectDto: AddProjectDto = {
        name: 'nowy',
        shortDescription: 'test',
        description: 'test',
        assets: [],
        projectGroupName: 'zmitac',
        categories: [
            {
                id: 1,
                name: 'it',
            },
            {
                id: 2,
                name: 'ti',
            },
        ],
        openPositions: [
            {
                name: 'dev',
                description: 'coś będziesz robić :DDDD',
                requirements: ['html', 'css', 'js'],
            },
        ],
    };

    plusIcon!: SafeHtml;
    organizationName = 'Agencja biura trzeciego sekretarza';

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.addProjectForm.controls.shortDescription.valueChanges.subscribe(
            (value) => {
                this.shortDescriptionInputSize = value ? value.length : 0;
            }
        );

        this.categories.push({ name: 'It', id: -5 });
        this.categories.push({ name: 'Nie wiem', id: -2 });
        this.categories.push({ name: 'test', id: 12 });

        this.mappedCategories = this.categories.map((value) => {
            return {
                text: value.name,
                value: value.id,
            };
        });

        this.iconVaultService
            .getIcon('ion_add')
            .subscribe((icon: SafeHtml | null) => {
                this.plusIcon = icon!;
            });
    }

    ngOnDestroy(): void {
        this.authPayloadSubscription.unsubscribe();
    }

    addProjectForm = new FormGroup({
        projectName: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        categories: new FormControl<number[]>([], {
            nonNullable: true,
            validators: [Validators.required],
        }),
        shortDescription: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.maxLength(this.maxShortDescriptionInputSize),
            ],
        }),
        description: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        recruitmentOpen: new FormControl<boolean>(false, {
            nonNullable: true,
        }),
        fundingOpen: new FormControl<boolean>(false, {
            nonNullable: true,
        }),
        fundingGoals: new FormControl<string>('', {
            nonNullable: true,
        }),
    });

    ngAfterViewInit(): void {
        this.descriptionVditor = new Vditor(
            this.descriptionMdEditorRef.nativeElement,
            {
                cache: {
                    enable: false,
                },
                toolbarConfig: {
                    pin: true,
                },
                toolbar: [
                    'headings',
                    'bold',
                    'italic',
                    'strike',
                    'line',
                    'quote',
                    'list',
                    'ordered-list',
                    'code',
                    'inline-code',
                    'link',
                    'emoji',
                ],
                theme: 'dark',
                lang: 'en_US',
                mode: 'wysiwyg',
                width: '100%',
                minHeight: 360,
                input: (value: string) => {
                    this.addProjectForm.controls.description.setValue(value);
                },
            }
        );

        this.fundingGoalsVditor = new Vditor(
            this.fundingGoalsMdEditorRef.nativeElement,
            {
                cache: {
                    enable: false,
                },
                toolbarConfig: {
                    pin: true,
                },
                toolbar: [
                    'headings',
                    'bold',
                    'italic',
                    'strike',
                    'line',
                    'quote',
                    'list',
                    'ordered-list',
                    'code',
                    'inline-code',
                    'link',
                    'emoji',
                ],
                theme: 'dark',
                lang: 'en_US',
                mode: 'wysiwyg',
                width: '100%',
                minHeight: 360,
                input: (value: string) => {
                    this.addProjectForm.controls.fundingGoals.setValue(value);
                },
                after: () => {
                    this.viewInitialized = true;
                    this.initFinished();
                },
            }
        );
    }

    filledData() {
        this.dataFilled = true;
        this.initFinished();
    }

    initFinished() {
        timer(50).subscribe(() => {
            if (this.viewInitialized && this.dataFilled) {
                this.descriptionVditor.setValue(
                    this.addProjectForm.controls.description.value
                );
                this.fundingGoalsVditor.setValue(
                    this.addProjectForm.controls.fundingGoals.value
                );
            }
        });
    }

    addNewAsset(file: File) {
        this.newAssets.push(file);
        this.addProjectDto?.assets.push(this.newAssets.length - 1);
        console.log(this.addProjectDto);
    }

    deleteOpenPosition(index: number) {
        this.addProjectDto.openPositions.splice(index, 1);
    }

    addOpenPosition() {
        this.modalService.updateModalState(
            AddOpenPositionModalComponent.ModalName,
            'open'
        );
    }

    onAddOpenPosition(newOpenPosition: NewOpenPositionDto) {
        this.addProjectDto.openPositions.push(newOpenPosition);

        this.toastrService.success(
            'Nowe ogłoszenie na członka projektu zostało dodane!',
            'Nowe ogłoszenie dodane'
        );

        this.modalService.updateModalState(
            AddOpenPositionModalComponent.ModalName,
            'close'
        );
    }

    addProject() {}
}
