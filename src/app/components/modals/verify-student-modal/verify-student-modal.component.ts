import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, map } from 'rxjs';
import { StudentshipService } from 'src/app/modules/auth/services/studentship.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { PolonService } from 'src/app/modules/polon/services/polon.service';
@Component({
    selector: 'app-verify-student-modal',
    templateUrl: './verify-student-modal.component.html',
    styleUrls: ['./verify-student-modal.component.scss'],
})
export class VerifyStudentModalComponent implements OnInit {
    static ModalName = 'verify-student-modal';
    get modalName() {
        return VerifyStudentModalComponent.ModalName;
    }

    form = new FormGroup({
        university: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        email: new FormControl<string>('', {
            validators: [Validators.required, Validators.email],
            nonNullable: true,
        }),
    });

    universities: { text: string; value: string }[] = [];

    inTransit = false;

    constructor(
        private readonly polonService: PolonService,
        private readonly studentshipService: StudentshipService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.loadUniversities();
    }

    verify() {
        this.inTransit = true;
        this.studentshipService
            .requestStudentshipVerification(
                this.form.controls.email.value,
                this.form.controls.university.value
            )
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.modalService.updateModalState(this.modalName, 'close');
                    this.toastrService.success(
                        'Wysłaliśmy wiadomość z linkiem potwierdzającym na podany adres.',
                        'Weryfikacja rozpoczęta'
                    );
                },
                error: () => {
                    this.inTransit = false;
                    this.toastrService.error(
                        'Podczas próby weryfikacji wystąpił błąd.',
                        'Błąd weryfikacji'
                    );
                },
            });
    }

    modalClosed() {
        this.form.reset();
    }

    private loadUniversities(): void {
        this.polonService
            .getAcademicInstitutions('OPERATING')
            .subscribe((institutions) => {
                this.universities = institutions.map((institution) => ({
                    text: institution.name,
                    value: institution.uid,
                }));
            });
    }
}
