import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-organization-modal',
    templateUrl: './create-organization-modal.component.html',
    styleUrls: ['./create-organization-modal.component.scss'],
})
export class CreateOrganizationModalComponent implements OnInit {
    createOrganizationForm: FormGroup;
    organizationName: String = '';
    sent: boolean = false;

    constructor() {
        this.createOrganizationForm = new FormGroup({
            organizationName: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {}

    onOrganizationCreate() {
        this.organizationName =
            this.createOrganizationForm.get('organizationName')?.value;
        this.sent = true;
    }
}
