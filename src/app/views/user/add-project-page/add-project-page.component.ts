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
import { ToastrService } from 'ngx-toastr';
import { Subscription, skipWhile, timer } from 'rxjs';
import { ChangeablePhotoGalleryComponent } from 'src/app/components/changeable-photo-gallery/changeable-photo-gallery.component';
import { AddOpenPositionModalComponent } from 'src/app/components/modals/add-open-position-modal/add-open-position-modal.component';
import { CategoryDto } from 'src/app/dtos/category.dto';
import { CreateOpenPositionDto } from 'src/app/dtos/create-open-position.dto';
import { CreateProjectDto } from 'src/app/dtos/create-project.dto';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationDto } from 'src/app/modules/organization/modules/organization-api/dtos/organization.dto';
import { ProjectService } from 'src/app/modules/project/services/project.service';
import Vditor from 'vditor';

@Component({
    selector: 'app-add-project-page',
    templateUrl: './add-project-page.component.html',
    styleUrls: ['./add-project-page.component.scss'],
})
export class AddProjectPageComponent implements OnInit, OnDestroy {
    private viewInitialized = false;
    private dataFilled = false;
    private subsink: Subscription[] = [];

    descriptionVditor!: Vditor;
    @ViewChild('descriptionMdEditor', { read: ElementRef })
    descriptionMdEditorRef!: ElementRef;

    @ViewChild('photoGallery') photoGallery!: ChangeablePhotoGalleryComponent;

    fundingGoalsVditor!: Vditor;
    @ViewChild('fundingGoalsMdEditor', { read: ElementRef })
    fundingGoalsMdEditorRef!: ElementRef;

    newAssets: File[] = [];
    categories: CategoryDto[] = [];
    shortDescriptionInputSize: number = 0;
    maxShortDescriptionInputSize: number = 150;
    addProjectDto: CreateProjectDto = {
        name: '',
        shortDescription: '',
        description: '',
        fundingObjectives: '',
        assets: [],
        categories: [],
        openPositions: [],
    };

    plusIcon!: SafeHtml;

    inTransit = false;

    @Input()
    organizationDto!: OrganizationDto;

    get mappedCategories() {
        return this.categories.map((category) => ({
            text: category.name,
            value: category.id,
        }));
    }

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService,
        private readonly projectService: ProjectService
    ) {}

    ngOnInit(): void {
        this.subsink.push(
            this.addProjectForm.controls.shortDescription.valueChanges.subscribe(
                (value) => {
                    this.shortDescriptionInputSize = value ? value.length : 0;
                }
            )
        );

        this.categories.push({ name: 'It', id: -5 });
        this.categories.push({ name: 'Nie wiem', id: -2 });
        this.categories.push({ name: 'test', id: 12 });

        this.iconVaultService
            .getIcon('ion_add')
            .subscribe((icon: SafeHtml | null) => {
                this.plusIcon = icon!;
            });
    }

    ngOnDestroy(): void {
        this.subsink.forEach((sub) => sub.unsubscribe());
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

    onAddOpenPosition(newOpenPosition: CreateOpenPositionDto) {
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

    addProject() {
        Object.assign(this.addProjectDto, {
            name: this.addProjectForm.controls.projectName.value,
            shortDescription:
                this.addProjectForm.controls.shortDescription.value,
            description: this.addProjectForm.controls.description.value.trim(),
            fundingObjectives: this.addProjectForm.controls.fundingOpen.value
                ? this.addProjectForm.controls.fundingGoals.value.trim()
                : '',
            categories: this.addProjectForm.controls.categories.value,
        } satisfies Omit<CreateProjectDto, 'assets' | 'openPositions'>);

        this.inTransit = true;
        this.projectService
            .createProjectDraft(
                this.organizationDto.id,
                this.addProjectDto,
                this.newAssets
            )
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Projekt został zgłoszony do sprawdzenia!',
                        'Projekt zgłoszony'
                    );
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
