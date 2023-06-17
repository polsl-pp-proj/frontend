import { Component } from '@angular/core';

@Component({
    selector: 'app-manage-organisations-page',
    templateUrl: './manage-organisations-page.component.html',
    styleUrls: ['./manage-organisations-page.component.scss'],
})
export class ManageOrganisationsPageComponent {
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
