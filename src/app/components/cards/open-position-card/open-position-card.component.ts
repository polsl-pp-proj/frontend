import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-open-position-card',
    templateUrl: './open-position-card.component.html',
    styleUrls: ['./open-position-card.component.scss'],
})
export class OpenPositionCardComponent {
    @Input()
    positionName!: string;

    @Input()
    buttonText!: string;

    @Input()
    positionDescription!: string;

    @Input()
    positionRequirements: string[] = [];

    @Output()
    trigger = new EventEmitter<void>();
}
