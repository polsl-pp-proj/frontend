import { Component, OnInit } from '@angular/core';
import { IntercomService } from './modules/intercom/services/intercom.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private readonly intercomService: IntercomService) {}

    ngOnInit(): void {
        this.intercomService.init();
    }
}
