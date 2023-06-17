import { Component } from '@angular/core';

@Component({
    selector: 'app-manage-organizations-page',
    templateUrl: './manage-organizations-page.component.html',
    styleUrls: ['./manage-organizations-page.component.scss'],
})
export class ManageOrganizationsPageComponent {
    orgList: {
        name: string;
    }[] = [
        {
            name: 'Pad',
        },
        {
            name: 'Padek',
        },
        {
            name: 'Paduch',
        },
    ];
}
