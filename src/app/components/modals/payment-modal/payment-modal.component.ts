import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-payment-modal',
    templateUrl: './payment-modal.component.html',
    styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
    static ModalName = 'payment-modal';
    get modalName() {
        return PaymentModalComponent.ModalName;
    }

    projectName = 'Projekt zielonej architektury';

    paymentForm = new FormGroup({
        amount: new FormControl<number>(0, {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.pattern('(0|[1-9][0-9]*)([.][0-9]{1,2})?'),
                Validators.min(0.01),
            ],
        }),
        anonymous: new FormControl<boolean>(false, { nonNullable: true }),
    });

    ngOnInit(): void {}

    sendPaymentRequest() {
        console.log(this.paymentForm);
    }
}
