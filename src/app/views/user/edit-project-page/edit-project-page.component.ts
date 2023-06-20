import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { ChangeablePhotoGalleryComponent } from 'src/app/components/changeable-photo-gallery/changeable-photo-gallery.component';
import { AddOpenPositionModalComponent } from 'src/app/components/modals/add-open-position-modal/add-open-position-modal.component';
import { CreateOpenPositionDto } from 'src/app/dtos/create-open-position.dto';
import { OpenPositionDto } from 'src/app/dtos/open-position.dto';
import { UpdateProjectDto } from 'src/app/dtos/update-project.dto';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationDto } from 'src/app/modules/organization/modules/organization-api/dtos/organization.dto';
import { ProjectService } from 'src/app/modules/project/services/project.service';
import Vditor from 'vditor';

@Component({
    selector: 'app-edit-project-page',
    templateUrl: './edit-project-page.component.html',
    styleUrls: ['./edit-project-page.component.scss'],
})
export class EditProjectPageComponent implements OnInit, OnDestroy {
    private viewInitialized = false;
    private dataFilled = false;
    private subsink: Subscription[] = [];

    @ViewChild('photoGallery') photoGallery!: ChangeablePhotoGalleryComponent;

    @ViewChild('descriptionMdEditor', { read: ElementRef })
    descriptionMdEditorRef!: ElementRef;
    descriptionVditor!: Vditor;

    @ViewChild('fundingGoalsMdEditor', { read: ElementRef })
    fundingGoalsMdEditorRef!: ElementRef;
    fundingGoalsVditor!: Vditor;

    newAssets: File[] = [];
    shortDescriptionInputSize: number = 0;
    maxShortDescriptionInputSize: number = 150;

    payload!: AuthTokenPayloadDto;

    draftId = -1;

    editProjectDto: UpdateProjectDto = {
        name: '',
        shortDescription: '',
        description: '',
        fundingObjectives: '',
        assets: [],
        categories: [],
        openPositions: [],
    };

    //TO BE CONTINUED

    oldOpenPositions: { [key: number]: OpenPositionDto } = {};

    get normalizaedOpenPositions() {
        return this.editProjectDto.openPositions.map((openPosition) => {
            if (typeof openPosition === 'number') {
                return this.oldOpenPositions[openPosition];
            } else {
                return openPosition;
            }
        });
    }

    plusIcon!: SafeHtml;

    inTransit = false;

    organizationDto: OrganizationDto = { name: 'Trwa ładowanie...', id: -1 };

    categoryOptions: { text: string; value: number }[] = [];

    constructor(
        private readonly router: Router,
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService,
        private readonly projectService: ProjectService,
        private readonly categoryService: CategoryService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    async ngOnInit() {
        const draftId = this.activatedRoute.snapshot.paramMap.get('draftId');

        if (draftId) {
            this.draftId = +draftId;
            this.projectService.getProjectDraftById(this.draftId).subscribe({
                next: (projectDto) => {
                    this.editProjectForm.reset({
                        categories: projectDto.categories.map(
                            (category) => category.id
                        ),
                        description: projectDto.description,
                        fundingGoals: projectDto.fundingObjectives,
                        fundingOpen:
                            !!projectDto.fundingObjectives &&
                            projectDto.fundingObjectives !== '',
                        projectName: projectDto.name,
                        recruitmentOpen: projectDto.openPositions.length > 0,
                        shortDescription: projectDto.shortDescription,
                    });
                    this.editProjectDto.assets = projectDto.assets;
                    this.organizationDto.id = projectDto.organizationId;
                    this.organizationDto.name = projectDto.organizationName;
                    this.oldOpenPositions = {};
                    this.editProjectDto.openPositions = [];
                    projectDto.openPositions.forEach((openPosition) => {
                        this.oldOpenPositions[openPosition.id] = openPosition;
                        this.editProjectDto.openPositions.push(openPosition.id);
                    });
                    this.filledData();
                },
                error: () => {
                    this.router.navigate(['/404']);
                    this.toastrService.info(
                        'Odwiedzony przez Ciebie projekt nie istnieje!',
                        'Projekt nie istnieje'
                    );
                },
            });

            this.subsink.push(
                this.editProjectForm.controls.shortDescription.valueChanges.subscribe(
                    (value) => {
                        this.shortDescriptionInputSize = value
                            ? value.length
                            : 0;
                    }
                ),
                this.categoryService.getCategories().subscribe((categories) => {
                    this.categoryOptions = categories.map((category) => ({
                        text: category.name,
                        value: category.id,
                    }));
                })
            );

            this.iconVaultService
                .getIcon('ion_add')
                .subscribe((icon: SafeHtml | null) => {
                    this.plusIcon = icon!;
                });
        }
    }

    ngOnDestroy(): void {
        this.subsink.forEach((sub) => sub.unsubscribe());
    }

    editProjectForm = new FormGroup({
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
                    this.editProjectForm.controls.description.setValue(value);
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
                    this.editProjectForm.controls.fundingGoals.setValue(value);
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
                    this.editProjectForm.controls.description.value
                );
                this.fundingGoalsVditor.setValue(
                    this.editProjectForm.controls.fundingGoals.value
                );
            }
        });
    }

    addNewAsset(file: File) {
        this.newAssets.push(file);
        this.editProjectDto?.assets.push(this.newAssets.length - 1);
    }

    deleteOpenPosition(index: number) {
        this.editProjectDto.openPositions.splice(index, 1);
    }

    addOpenPosition() {
        this.modalService.updateModalState(
            AddOpenPositionModalComponent.ModalName,
            'open'
        );
    }

    onAddOpenPosition(newOpenPosition: CreateOpenPositionDto) {
        this.editProjectDto.openPositions.push(newOpenPosition);

        this.toastrService.success(
            'Nowe ogłoszenie na członka projektu zostało dodane!',
            'Nowe ogłoszenie dodane'
        );

        this.modalService.updateModalState(
            AddOpenPositionModalComponent.ModalName,
            'close'
        );
    }

    addProject() {
        Object.assign(this.editProjectDto, {
            name: this.editProjectForm.controls.projectName.value,
            shortDescription:
                this.editProjectForm.controls.shortDescription.value,
            description: this.editProjectForm.controls.description.value.trim(),
            fundingObjectives: this.editProjectForm.controls.fundingOpen.value
                ? this.editProjectForm.controls.fundingGoals.value.trim()
                : '',
            categories: this.editProjectForm.controls.categories.value,
        } satisfies Omit<UpdateProjectDto, 'assets' | 'openPositions'>);

        this.inTransit = true;
        this.projectService
            .updateProjectDraft(
                this.draftId,
                this.editProjectDto,
                this.newAssets
            )
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Projekt został zgłoszony do sprawdzenia!',
                        'Projekt zgłoszony'
                    );
                    this.router.navigate([
                        '/organization',
                        this.organizationDto.id,
                    ]);
                },
                error: (err) => {
                    this.inTransit = false;
                    this.toastrService.error(
                        'Podczas próby zgłoszenia projektu do sprawdzenia wystąpił błąd.',
                        'Błąd zgłoszenia'
                    );
                },
            });
    }
}
