import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { OrganizationMemberDto } from 'src/app/modules/organization/modules/organization-api/dtos/organization-member.dto';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

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

    @Input()
    organizationId!: number;

    displayErrorMessage: boolean = false;

    members: OrganizationMemberDto[] = [
        {
            id: 1,
            firstName: 'xxxxxxx',
            lastName: 'xxxxxxxxx',
            emailAddress: 'kamil3232@op.pl',
            role: OrganizationMemberRole.Member,
        },
        {
            id: 321,
            firstName: 'yyyyy',
            lastName: 'yyyyyyyy',
            emailAddress: 'kamil321232@op.pl',
            role: OrganizationMemberRole.Member,
        },
        {
            id: 55555,
            firstName: 'zzzzzz',
            lastName: 'zzzzzzzzz',
            emailAddress: 'kamil32121232@op.pl',
            role: OrganizationMemberRole.Member,
        },
        {
            id: 2324,
            firstName: 'Lorem',
            lastName: 'Ipsum',
            emailAddress: 'kamddil3232@op.pl',
            role: OrganizationMemberRole.Owner,
        },
    ];

    membersToDisplay: MemberToDisplay[] = [];

    removeOrganizationMembersForm = new FormGroup({
        members: new FormControl<number[]>([], {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    inTransit = false;

    private authTokenPayloadSubscription!: Subscription;
    private currentUserId: number = -1;

    constructor(
        private readonly organizationService: OrganizationService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService,
        private readonly authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authTokenPayloadSubscription =
            this.authService.authTokenPayload.subscribe((payload) => {
                if (payload) {
                    this.currentUserId = payload.userId;
                } else {
                    this.currentUserId = -1;
                }
            });
    }

    updateMembersToDisplay() {
        this.membersToDisplay.splice(0, this.membersToDisplay.length);
        for (let i = 0; i < this.members.length; ++i) {
            this.membersToDisplay.push({
                text:
                    this.members[i].emailAddress + ': ' + this.members[i].role,
                value: this.members[i].id,
                disabled: this.members[i].id === this.currentUserId,
            });
        }
    }

    ngOnDestroy(): void {
        this.authTokenPayloadSubscription.unsubscribe();
    }

    sendRemoveOrganizationMembersRequest() {
        this.inTransit = true;
        this.organizationService
            .removeOrganizationMembers(
                this.organizationId,
                this.removeOrganizationMembersForm.controls.members.value
            )
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Wybrani członkowie organizacji zostali usunięci',
                        'Członkowie usunięci'
                    );
                    this.modalService.updateModalState(this.modalName, 'close');
                },
                error: () => {
                    this.inTransit = false;
                    this.toastrService.error(
                        'Wystąpił błąd podczas usuwania członków organizacji',
                        'Błąd usuwania'
                    );
                },
            });
    }

    modalClosed() {
        this.removeOrganizationMembersForm.reset();
    }
}
