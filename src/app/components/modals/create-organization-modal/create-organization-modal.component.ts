import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrganizationDto } from 'src/app/dtos/create-organization-dto';

@Component({
    selector: 'app-create-organization-modal',
    templateUrl: './create-organization-modal.component.html',
    styleUrls: ['./create-organization-modal.component.scss'],
})
export class CreateOrganizationModalComponent implements OnInit {
    createOrganizationForm: FormGroup;
    sent: boolean = false;

    createOrganizationDto = new CreateOrganizationDto('');

    constructor() {
        this.createOrganizationForm = new FormGroup({
            organizationName: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit(): void {}

    onOrganizationCreate() {
        this.sent = true;
        this.createOrganizationDto.organizationName =
            this.createOrganizationForm.get('organizationName')?.value;
    }
}
