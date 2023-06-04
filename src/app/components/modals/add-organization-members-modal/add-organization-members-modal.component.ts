import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';

@Component({
    selector: 'app-add-organization-members-modal',
    templateUrl: './add-organization-members-modal.component.html',
    styleUrls: ['./add-organization-members-modal.component.scss'],
})
export class AddOrganizationMembersModalComponent implements OnInit {
    static ModalName = 'add-organization-members-modal';
    get modalName() {
        return AddOrganizationMembersModalComponent.ModalName;
    }

    constructor(private fb: FormBuilder) {}

    roles = [
        { text: 'Członek', value: OrganizationMemberRole.Member },
        { text: 'Właściciel', value: OrganizationMemberRole.Owner },
    ];

    addOrganizationMemberForm = this.fb.group({
        newMembers: new FormArray<FormGroup>([]),
    });

    addMemberRow() {
        const newMemberForm = this.fb.group({
            newMemberEmail: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            assignedRole: new FormControl<OrganizationMemberRole>(
                OrganizationMemberRole.Member,
                {
                    nonNullable: true,
                    validators: [Validators.required],
                }
            ),
        });
        this.newMembers.push(newMemberForm);
    }

    removeMemberRow(rowIndex: number) {
        this.newMembers.removeAt(rowIndex);
    }

    get newMembers() {
        return this.addOrganizationMemberForm.controls[
            'newMembers'
        ] as FormArray;
    }

    ngOnInit(): void {
        this.addMemberRow();
    }

    sendAddRequest() {
        console.log(this.addOrganizationMemberForm);
    }
}
