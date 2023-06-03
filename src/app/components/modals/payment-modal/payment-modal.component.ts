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
        amount: new FormControl<number>(0, [
            Validators.required,
            Validators.pattern('(0|[1-9][0-9]*)([.][0-9]{1,2})?'),
            Validators.min(0.01),
        ]),
        name: new FormControl<string>('', [Validators.required]),
        anonymous: new FormControl<boolean>(false),
    });

    get anonymous() {
        return this.paymentForm.controls.anonymous.value;
    }

    ngOnInit(): void {
        this.paymentForm.get('anonymous')?.valueChanges.subscribe((value) => {
            if (!value) {
                this.paymentForm.get('name')?.enable();
            } else {
                this.paymentForm.get('name')?.setValue('');
                this.paymentForm.get('name')?.disable();
            }
        });
    }

    sendPaymentRequest() {
        console.log(this.paymentForm);
    }
}
