import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { ProjectMessageDto } from 'src/app/modules/project/modules/project-api/dtos/project-message.dto';
import { ProjectService } from 'src/app/modules/project/services/project.service';

@Component({
    selector: 'app-rereply-modal',
    templateUrl: './rereply-modal.component.html',
    styleUrls: ['./rereply-modal.component.scss'],
})
export class ReReplyModalComponent {
    static ModalName = 'rereply-modal';
    get modalName() {
        return ReReplyModalComponent.ModalName;
    }

    @Input()
    projectId!: number;

    messageMaxLength = 500;

    inTransit = false;

    constructor(
        private readonly modalSerivce: ModalService,
        private readonly toastrService: ToastrService,
        private readonly projectService: ProjectService
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
        this.inTransit = true;
        this.projectService
            .sendProjectMessage(
                this.projectId,
                new ProjectMessageDto({
                    subject: this.messageForm.controls.subject.value,
                    message: this.messageForm.controls.message.value,
                })
            )
            .subscribe({
                next: () => {
                    this.toastrService.success(
                        'Twoja wiadomość została wysłana do organizacji.',
                        'Wiadomość wysłana'
                    );
                    this.modalSerivce.updateModalState(this.modalName, 'close');

                    this.inTransit = false;
                },
                error: () => {
                    this.toastrService.error(
                        'Podczas próby wysłania Twojej wiadomości wystąpił błąd. Spróbuj ponownie.',
                        'Błąd wysyłania'
                    );
                    this.inTransit = false;
                },
            });
    }

    modalClosed() {
        this.messageForm.reset();
    }
}
