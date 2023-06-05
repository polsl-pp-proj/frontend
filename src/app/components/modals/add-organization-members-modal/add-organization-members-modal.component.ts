import { Component, Input, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { MemberDto } from 'src/app/modules/organization/modules/organization-api/dtos/member.dto';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

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

    @Input()
    organizationId!: number;

    roles = [
        { text: 'Członek', value: OrganizationMemberRole.Member },
        { text: 'Właściciel', value: OrganizationMemberRole.Owner },
    ];

    addOrganizationMemberForm = this.fb.group({
        newMembers: new FormArray<
            FormGroup<{
                newMemberEmail: FormControl<string>;
                assignedRole: FormControl<OrganizationMemberRole>;
            }>
        >([]),
    });

    inTransit = false;

    constructor(
        private fb: FormBuilder,
        private readonly organizationService: OrganizationService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

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
        this.inTransit = true;
        const newMembers = this.addOrganizationMemberForm.value.newMembers!.map(
            (value) =>
                new MemberDto({
                    emailAddress: value.newMemberEmail!,
                    memberRole: value.assignedRole!,
                })
        );

        if (newMembers.length) {
            this.organizationService
                .addOrganizationMembers(this.organizationId, newMembers)
                .subscribe({
                    next: () => {
                        this.inTransit = false;
                        this.modalService.updateModalState(
                            this.modalName,
                            'close'
                        );
                        this.toastrService.success(
                            newMembers.length > 1
                                ? 'Użytkownicy zostali dodani do organizacji'
                                : 'Użytkownik został dodany do organizacji',
                            `Dodano ${
                                newMembers.length > 1
                                    ? 'użytkowników'
                                    : 'użytkownika'
                            }`
                        );
                    },
                    error: () => {
                        this.inTransit = false;
                        this.toastrService.error(
                            `Wystąpił błąd podczas próby dodania ${
                                newMembers.length > 1
                                    ? 'użytkowników'
                                    : 'użytkownika'
                            } do organizacji.`,
                            `Błąd dodawania ${
                                newMembers.length > 1
                                    ? 'użytkowników'
                                    : 'użytkownika'
                            }`
                        );
                    },
                });
        } else {
            this.inTransit = false;
        }
    }
}
