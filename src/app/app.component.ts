import { AfterViewInit, Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ModalService } from './modules/modal/services/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        register();
    }
}
