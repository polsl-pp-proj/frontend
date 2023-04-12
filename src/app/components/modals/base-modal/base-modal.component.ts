import {
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-base-modal',
    templateUrl: './base-modal.component.html',
    styleUrls: ['./base-modal.component.scss'],
})
export class BaseModalComponent implements OnInit {
    @HostBinding('class.open')
    open: boolean = false;

    @HostBinding('style.--transition-duration')
    @Input()
    transitionDuration: string = '0.2s';

    @Input() modalTitle = 'Modal';
    @Input() modalName!: string;
    @Input() closable = true;

    @Output() closed = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    closeIcon!: SafeHtml;

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.iconVaultService
            .getIcon('ion_close')
            .pipe(filter((value) => value !== null))
            .subscribe({
                next: (icon: SafeHtml | null) => {
                    this.closeIcon = icon!;
                },
            });
        this.modalService
            .registerModal(this.modalName)
            .subscribe((open: boolean) => {
                this.open = open;
                if (!open) {
                    this.closed.emit();
                }
            });
    }

    @HostListener('click')
    closeModal() {
        if (this.closable) {
            this.modalService.updateModalState(this.modalName, 'close');
        }
    }

    @HostListener('keyup', ['$event'])
    pressedKey(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.submit.emit();
        }
    }
}
