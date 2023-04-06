import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-recent-payment-card',
    templateUrl: './recent-payment-card.component.html',
    styleUrls: ['./recent-payment-card.component.scss'],
})
export class RecentPaymentCardComponent {
    @Input()
    userName: string = 'Anonim';

    @Input()
    amount = 0;
}
