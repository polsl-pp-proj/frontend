import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeElements } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { ProjectDto } from 'src/app/dtos/project.dto';
import { DonationService } from 'src/app/modules/donation/services/donation.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

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

    @Input()
    projectDto!: ProjectDto;

    step1InTransit = false;
    step2InTransit = false;

    step: 1 | 2 = 1;
    stripeElements?: StripeElements;

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

    constructor(
        private readonly donationService: DonationService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit(): void {}

    sendPaymentRequest() {
        this.step1InTransit = true;
        this.donationService
            .prepareDonationForProject(this.projectDto.id, {
                amount: +this.paymentForm.controls.amount.value,
                isAnonymous: !!this.paymentForm.controls.anonymous.value,
            })
            .subscribe({
                next: ({ clientSecret }) => {
                    this.step2InTransit = true;
                    this.step = 2;
                    timer(0).subscribe(() => {
                        this.donationService
                            .prepareDonationPayment(
                                document.getElementById(
                                    `${this.modalName}--stripe-payment-wrapper`
                                )!,
                                clientSecret
                            )
                            .subscribe({
                                next: (elements) => {
                                    this.stripeElements = elements;
                                    this.step1InTransit = false;
                                    this.stripeElements
                                        .getElement('payment')!
                                        .on('ready', () => {
                                            this.step2InTransit = false;
                                        });
                                },
                                error: () => {
                                    this.reset();
                                    this.toastrService.error(
                                        'Podczas przygotowywania płatności wystąpił błąd',
                                        'Błąd płatności'
                                    );
                                },
                            });
                    });
                },
                error: () => {
                    this.reset();
                    this.toastrService.error(
                        'Podczas próby przygotowania płatności wystąpił błąd',
                        'Błąd płatności'
                    );
                },
            });
    }

    confirmPayment() {
        this.step2InTransit = true;
        this.donationService
            .confirmDonationPayment(this.stripeElements!)
            .subscribe({
                next: () => {
                    this.reset();
                    this.modalService.updateModalState(this.modalName, 'close');
                },
                error: () => {
                    this.reset();
                },
            });
    }

    modalClosed() {
        this.reset();
    }

    private reset() {
        this.step = 1;
        this.step1InTransit = false;
        this.step2InTransit = false;
        this.stripeElements = undefined;
        this.paymentForm.reset();
    }
}
