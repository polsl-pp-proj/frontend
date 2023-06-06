import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile } from 'src/app/helpers/data-url-to-file.helper';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-image-cropper-modal',
    templateUrl: './image-cropper-modal.component.html',
    styleUrls: ['./image-cropper-modal.component.scss'],
})
export class ImageCropperModalComponent {
    static ModalName = 'image-cropper-modal';
    get modalName() {
        return ImageCropperModalComponent.ModalName;
    }

    private croppedImage: File | null = null;

    @Input()
    imageFile: File | null = null;

    @Output()
    imageSubmitted = new EventEmitter<File>();

    constructor(private readonly modalService: ModalService) {}

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = dataURLtoFile(event.base64!, this.imageFile!.name);
    }

    submitImage() {
        if (this.croppedImage) {
            this.imageSubmitted.emit(this.croppedImage);
            this.imageFile = null;
            this.croppedImage = null;
            this.modalService.updateModalState(this.modalName, 'close');
        }
    }
}
