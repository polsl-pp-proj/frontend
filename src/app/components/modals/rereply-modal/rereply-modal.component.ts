import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { NotificationDto } from 'src/app/modules/notification/modules/notification-api/dtos/notification.dto';
import { NotificationType } from 'src/app/modules/notification/modules/notification-api/enums/notification-type.enum';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
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
    notification!: NotificationDto;

    messageMaxLength = 500;

    inTransit = false;

    constructor(
        private readonly modalSerivce: ModalService,
        private readonly toastrService: ToastrService,
        private readonly projectService: ProjectService,
        private readonly notificationService: NotificationService
    ) {}

    messageForm = new FormGroup({
        message: new FormControl<string>('', {
            validators: [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(500),
            ],
            nonNullable: true,
        }),
    });

    sendMessage() {
        this.inTransit = true;
        if (
            this.notification.type === NotificationType.ProjectMessage ||
            this.notification.type === NotificationType.OpenPositionApplication
        ) {
            this.notificationService
                .answerNotification(
                    this.notification,
                    this.messageForm.controls.message.value
                )
                .subscribe({
                    next: () => {
                        this.toastrService.success(
                            'Twoja wiadomość została wysłana do użytkownika.',
                            'Wiadomość wysłana'
                        );
                        this.modalSerivce.updateModalState(
                            this.modalName,
                            'close'
                        );

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
        } else {
            this.projectService
                .sendProjectMessage(
                    this.notification.project.id,
                    new ProjectMessageDto({
                        subject: `${
                            this.notification.subject.startsWith('Re:')
                                ? ''
                                : 'Re: '
                        }${this.notification.subject}`,
                        message: this.messageForm.controls.message.value,
                    })
                )
                .subscribe({
                    next: () => {
                        this.toastrService.success(
                            'Twoja wiadomość została wysłana do organizacji.',
                            'Wiadomość wysłana'
                        );
                        this.modalSerivce.updateModalState(
                            this.modalName,
                            'close'
                        );

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
    }

    modalClosed() {
        this.messageForm.reset();
    }
}
