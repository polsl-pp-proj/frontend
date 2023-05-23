import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/modules/help/services/help.service';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
    constructor(private readonly helpService: HelpService) {}

    ngOnInit(): void {
        this.helpService.registerPageHelp('not-found-page');
    }
}
