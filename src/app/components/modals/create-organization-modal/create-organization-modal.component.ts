import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

@Component({
    selector: 'app-create-organization-modal',
    templateUrl: './create-organization-modal.component.html',
    styleUrls: ['./create-organization-modal.component.scss'],
})
export class CreateOrganizationModalComponent implements OnInit {
    modalName = 'create-organization-modal';
    createOrganizationForm = new FormGroup({
        organizationName: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });
    inTransit: boolean = false;

    constructor(
        private readonly organizationService: OrganizationService,
        private readonly toastrService: ToastrService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {}

    createOrganization() {
        this.inTransit = true;
        this.organizationService
            .createOrganization(
                this.createOrganizationForm.controls.organizationName.value
            )
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Twoja organizacja została utworzona!',
                        'Organizacja utworzona'
                    );
                    this.createOrganizationForm.reset();
                    this.modalService.updateModalState(this.modalName, 'close');
                },
                error: (err: HttpErrorResponse) => {
                    this.inTransit = false;
                    this.toastrService.error(
                        'Wystąpił błąd podczas tworzenia organizacji. Spróbuj ponownie później.',
                        'Błąd tworzenia organizacji'
                    );
                },
            });
    }
}
