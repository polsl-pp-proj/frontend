import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

    roles = [
        { text: 'Członek', value: OrganizationMemberRole.Member },
        { text: 'Właściciel', value: OrganizationMemberRole.Owner },
    ];

    addOrganizationMemberForm = new FormGroup({
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

    ngOnInit(): void {}

    sendAddRequest() {
        console.log(
            this.addOrganizationMemberForm.controls.newMemberEmail.value
        );
        console.log(this.addOrganizationMemberForm.controls.assignedRole.value);
        console.log(this.addOrganizationMemberForm);
    }
}
