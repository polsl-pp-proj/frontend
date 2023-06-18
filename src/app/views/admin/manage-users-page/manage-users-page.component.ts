import { Component } from '@angular/core';
import { UserOrganizationDto } from 'src/app/modules/auth/dtos/user-organization.dto';

@Component({
    selector: 'app-manage-users-page',
    templateUrl: './manage-users-page.component.html',
    styleUrls: ['./manage-users-page.component.scss'],
})
export class ManageUsersPageComponent {
    usersList: {
        name: string;
        lastname: string;
        role: string;
        email: string;
        student: string;
    }[] = [
        {
            name: 'Pad',
            lastname: 'Paduch',
            email: 'test@test.com',
            role: 'Moderator',
            student: 'Nie',
        },
        {
            name: 'Pad',
            lastname: 'Oleg',
            email: 'test@test.com',
            role: 'Student',
            student: 'Tak',
        },
        {
            name: 'Pad',
            lastname: 'Zielinski',
            email: 'test@test.com',
            role: 'Administrator',
            student: 'Nie',
        },
    ];
}
