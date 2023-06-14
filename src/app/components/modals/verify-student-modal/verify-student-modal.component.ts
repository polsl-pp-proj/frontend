import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
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
    private universitiesSubscription!: Subscription;

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

    constructor(private polonService: PolonService) {}

    universities: { text: string; value: string }[] = [];

    private loadUniversities(): void {
        this.universitiesSubscription = this.polonService
            .getAcademicInstitutions('OPERATING')
            .subscribe((institutions) => {
                console.log(institutions);
                this.universities = institutions.map((institution) => ({
                    text: institution.name,
                    value: institution.uid,
                }));
            });
    }

    ngOnInit(): void {
        this.loadUniversities();
    }
}
