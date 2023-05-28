import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { MemberDto } from 'src/app/modules/organization/modules/organization-api/dtos/member.dto';

type MemberToDisplay = {
    text: string;
    value: number;
    disabled?: boolean;
    selected?: boolean;
};

@Component({
    selector: 'app-remove-organization-members-modal',
    templateUrl: './remove-organization-members-modal.component.html',
    styleUrls: ['./remove-organization-members-modal.component.scss'],
})
export class RemoveOrganizationMembersModalComponent implements OnInit {
    static ModalName = 'remove-organization-members-modal';
    get modalName() {
        return RemoveOrganizationMembersModalComponent.ModalName;
    }

    displayErrorMessage: boolean = false;

    members: MemberDto[] = [
        {
            emailAddress: 'kamil3232@op.pl',
            memberRole: OrganizationMemberRole.Member,
        },
        {
            emailAddress: 'kamil321232@op.pl',
            memberRole: OrganizationMemberRole.Member,
        },
        {
            emailAddress: 'kamil32121232@op.pl',
            memberRole: OrganizationMemberRole.Member,
        },
        {
            emailAddress: 'kamddil3232@op.pl',
            memberRole: OrganizationMemberRole.Owner,
        },
    ];

    membersToDisplay: MemberToDisplay[] = [];

    removeOrganizationMembersForm = new FormGroup({
        members: new FormControl<number[]>([], {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    ngOnInit(): void {
        for (let i = 0; i < this.members.length; ++i) {
            this.membersToDisplay.push({
                text:
                    this.members[i].emailAddress +
                    ': ' +
                    this.members[i].memberRole,
                value: i,
            });
        }
    }

    sendRemoveOrganizationMembersRequest() {
        console.log(this.removeOrganizationMembersForm.controls.members.value);
    }
}
{
}
