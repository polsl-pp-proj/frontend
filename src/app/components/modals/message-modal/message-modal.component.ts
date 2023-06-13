import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
    static ModalName = 'message-modal';
    get modalName() {
        return MessageModalComponent.ModalName;
    }

    @Input()
    projectId!: number;

    messageMaxLength = 500;

    constructor(
        private readonly modalSerivce: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    messageForm = new FormGroup({
        subject: new FormControl<string>('', {
            validators: [Validators.required, Validators.maxLength(50)],
            nonNullable: true,
        }),
        message: new FormControl<string>('', {
            validators: [Validators.required, Validators.maxLength(500)],
            nonNullable: true,
        }),
    });

    sendMessage() {
        this.toastrService.success(
            'Twoja wiadomość została wysłana do organizacji',
            'Wiadomość wysłana'
        );
        this.modalSerivce.updateModalState(this.modalName, 'close');
    }

    modalClosed() {
        this.messageForm.reset();
    }
}
