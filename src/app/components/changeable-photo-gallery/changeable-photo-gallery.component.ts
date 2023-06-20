import {
    ChangeDetectorRef,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    IterableDiffer,
    IterableDiffers,
    OnInit,
    Output,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ProjectAssetDto } from 'src/app/dtos/project-asset.dto';
import { AssetType } from 'src/app/enums/asset-type.enum';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { environment } from 'src/environments/environment';
import { ImageCropperModalComponent } from '../modals/image-cropper-modal/image-cropper-modal.component';
declare var window: any;

@Component({
    selector: 'app-changable-photo-gallery',
    templateUrl: './changeable-photo-gallery.component.html',
    styleUrls: ['./changeable-photo-gallery.component.scss'],
})
export class ChangeablePhotoGalleryComponent implements OnInit, DoCheck {
    private assetDiffers: IterableDiffer<ProjectAssetDto | number>;

    @Input()
    assets!: Array<ProjectAssetDto | number>;

    @Input()
    newAssets!: File[];

    @Output()
    newAsset = new EventEmitter<File>();

    normalizedAssets: {
        title: string;
        url: SafeUrl | string;
        type: AssetType;
    }[] = [];

    currentAsset!: File;

    constructor(
        iterableDiffers: IterableDiffers,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly domSanitizer: DomSanitizer,
        private readonly toastrService: ToastrService,
        private readonly modalService: ModalService
    ) {
        this.assetDiffers = iterableDiffers.find([]).create();
    }

    ngOnInit(): void {}

    ngDoCheck(): void {
        let changes = this.assetDiffers.diff(this.assets);
        if (changes) {
            this.normalizedAssets = this.prepareNormalizedAssets(
                this.assets,
                this.newAssets
            );
        }
    }

    deleteAsset(index: number): void {
        if (typeof this.assets[index] === 'number') {
            this.newAssets.splice(this.assets[index] as number, 1);
            this.assets.forEach((v, i) => {
                if (
                    typeof v === 'number' &&
                    v > (this.assets[index] as number)
                ) {
                    --(this.assets[i] as number);
                }
            });
        }
        this.assets.splice(index, 1)[0];
        this.changeDetectorRef.detectChanges();
    }

    moveAssetLeft(index: number) {
        this.assets[index - 1] = this.assets.splice(
            index,
            1,
            this.assets[index - 1]
        )[0];
        this.changeDetectorRef.detectChanges();
    }

    moveAssetRight(index: number) {
        this.assets[index] = this.assets.splice(
            index + 1,
            1,
            this.assets[index]
        )[0];
        this.changeDetectorRef.detectChanges();
    }

    onAddAsset(event: Event) {
        const currentTarget = event.currentTarget as HTMLInputElement;
        const files = currentTarget.files as FileList;
        if (files?.length === 1) {
            const file = files[0];
            if (['image/png', 'image/jpeg'].includes(file.type)) {
                if (file.size < 1000000) {
                    this.currentAsset = file;
                    this.modalService.updateModalState(
                        ImageCropperModalComponent.ModalName,
                        'open'
                    );
                } else {
                    this.toastrService.error(
                        'Ten plik jest za duży',
                        'Przekroczony rozmiar pliku'
                    );
                }
            } else {
                this.toastrService.error(
                    'Ten plik nie jest zdjęciem',
                    'Nieprawidłowy format pliku'
                );
            }
        }
        currentTarget.value = '';
    }

    addImage(file: File) {
        this.newAsset.emit(file);
    }

    prepareNormalizedAssets(
        assets: Array<ProjectAssetDto | number>,
        newAssets: Array<File>
    ) {
        return assets.map((asset) => {
            if (typeof asset === 'number') {
                return {
                    title: 'n/a',
                    url: this.domSanitizer.bypassSecurityTrustUrl(
                        URL.createObjectURL(newAssets[asset])
                    ),
                    type: AssetType.Image,
                } as ProjectAssetDto;
            } else {
                return {
                    ...asset,
                    url: `${environment.remoteAssetsPath}/${asset.url}`,
                };
            }
        });
    }
}
