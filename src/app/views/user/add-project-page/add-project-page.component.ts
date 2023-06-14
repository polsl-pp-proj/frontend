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
import { Subscription, timer } from 'rxjs';
import { ChangeablePhotoGalleryComponent } from 'src/app/components/changeable-photo-gallery/changeable-photo-gallery.component';
import { AddOpenPositionModalComponent } from 'src/app/components/modals/add-open-position-modal/add-open-position-modal.component';
import { NewOpenPositionDto } from 'src/app/dtos/new-open-position.dto';
import { AddProjectDto } from 'src/app/dtos/project.dto';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { CategoryDto } from 'src/app/modules/category/modules/category-api/dtos/category.dto';
import { CategoryService } from 'src/app/modules/category/services/category.service';
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
    private subsink: Subscription[] = [];

    @ViewChild('photoGallery') photoGallery!: ChangeablePhotoGalleryComponent;

    @ViewChild('descriptionMdEditor', { read: ElementRef })
    descriptionMdEditorRef!: ElementRef;
    descriptionVditor!: Vditor;

    @ViewChild('fundingGoalsMdEditor', { read: ElementRef })
    fundingGoalsMdEditorRef!: ElementRef;
    fundingGoalsVditor!: Vditor;

    newAssets: File[] = [];

    payload!: AuthTokenPayloadDto;

    categories: CategoryDto[] = [];

    addProjectDto: AddProjectDto = {
        name: '',
        shortDescription: '',
        description: '',
        assets: [],
        projectGroupName: '',
        categories: [],
        openPositions: [],
    };

    shortDescriptionInputSize: number = 0;
    maxShortDescriptionInputSize: number = 150;

    plusIcon!: SafeHtml;
    organizationName = 'Agencja biura trzeciego sekretarza';

    get categoryOptions() {
        return this.categories.map((category) => ({
            text: category.name,
            value: category.id,
        }));
    }

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService,
        private readonly categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.subsink.push(
            this.addProjectForm.controls.shortDescription.valueChanges.subscribe(
                (value) => {
                    this.shortDescriptionInputSize = value ? value.length : 0;
                }
            ),
            this.categoryService
                .getCategories()
                .subscribe((categories) => (this.categories = categories))
        );

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
