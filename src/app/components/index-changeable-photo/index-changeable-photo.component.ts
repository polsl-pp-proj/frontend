import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { AssetType } from 'src/app/enums/asset-type.enum';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';

@Component({
    selector: 'app-index-changeable-photo',
    templateUrl: './index-changeable-photo.component.html',
    styleUrls: ['./index-changeable-photo.component.scss'],
})
export class IndexChangeablePhotoComponent implements OnInit {
    xIcon!: SafeHtml;

    constructor(private readonly iconVaultService: IconVaultService) {}

    @Input()
    asset!: { title: string; url: string | SafeHtml; type: AssetType } | null;

    @Input()
    showMoveLeft = false;

    @Input()
    showMoveRight = false;

    @Input()
    showDeleteAsset = false;

    @Output()
    moveLeft = new EventEmitter<void>();

    @Output()
    moveRight = new EventEmitter<void>();

    @Output()
    deleteAsset = new EventEmitter<void>();

    ngOnInit(): void {
        this.iconVaultService
            .getIcon('ion_x')
            .subscribe((icon: SafeHtml | null) => {
                this.xIcon = icon!;
            });
    }

    onMoveLeft() {
        this.moveLeft.emit();
    }

    onMoveRight() {
        this.moveRight.emit();
    }

    onDelete() {
        this.deleteAsset.emit();
    }
}
