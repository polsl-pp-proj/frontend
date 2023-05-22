import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/modules/help/services/help.service';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
    constructor(private readonly helpService: HelpService) {}

    ngOnInit(): void {
        this.helpService.registerPageHelp('user/about-page');
    }
}
