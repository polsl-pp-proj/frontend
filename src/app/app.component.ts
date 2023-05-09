import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IntercomService } from './modules/intercom/services/intercom.service';
import { register } from 'swiper/element/bundle';

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

    ngAfterViewInit(): void {
        register();
    }
}
