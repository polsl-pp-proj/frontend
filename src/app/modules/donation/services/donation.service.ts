import { Injectable } from '@angular/core';
import { DonationApiService } from '../modules/donation-api/services/donation-api.service';
import { BehaviorSubject, from, map, mergeMap, skipWhile } from 'rxjs';
import {
    PaymentIntentResult,
    Stripe,
    StripeElements,
    loadStripe,
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class DonationService {
    private readonly stripe = new BehaviorSubject<Stripe | undefined>(
        undefined
    );

    constructor(
        private readonly donationApiService: DonationApiService,
        private readonly toastrService: ToastrService
    ) {
        this.initializeStripe();
    }

    prepareDonationForProject(
        projectId: number,
        projectDonationData: { amount: number; isAnonymous: boolean }
    ) {
        return this.donationApiService.prepareDonationForProject(
            projectId,
            projectDonationData
        );
    }

    prepareDonationPayment(paymentElement: HTMLElement, clientSecret: string) {
        return this.stripe.pipe(
            skipWhile((stripe) => stripe === undefined),
            map((stripe) => {
                const elements = stripe!.elements({
                    appearance: {
                        labels: 'above',
                        variables: {
                            colorText: '#fff',
                            borderRadius: '100vw',
                            fontFamily:
                                'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            colorBackground: '#191919',
                            colorDanger: '#ff5353',
                        },
                        rules: {
                            '.Input, .Input:focus': {
                                border: '4px solid #007cee',
                                outline: 'none',
                                boxShadow: 'none',
                            },
                            '.Input--invalid, .Input--invalid:focus': {
                                border: '4px solid #ff5353',
                                outline: 'none',
                                boxShadow: 'none',
                            },
                        },
                    },
                    locale: 'pl',
                    fonts: [
                        {
                            cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat',
                        },
                    ],
                    clientSecret,
                });
                const element = elements.create('payment');
                element.mount(paymentElement);
                return elements;
            })
        );
    }

    confirmDonationPayment(elements: StripeElements) {
        return this.stripe.pipe(
            skipWhile((stripe) => stripe === undefined),
            map(async (stripe) => {
                const paymentIntentResult = await stripe?.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: `${environment.frontendUrl}?df=true`,
                    },
                    redirect: 'if_required',
                });

                this.displayDonationPaymentResult(paymentIntentResult);
            }),
            mergeMap((confirm) => from(confirm))
        );
    }

    checkPaymentStatus(clientSecret: string) {
        return this.stripe.pipe(
            skipWhile((stripe) => stripe === undefined),
            map(async (stripe) => {
                const paymentIntentResult = await stripe?.retrievePaymentIntent(
                    clientSecret
                );

                this.displayDonationPaymentResult(paymentIntentResult);
            })
        );
    }

    getProjectDonationStats(projectId: number) {
        return this.donationApiService.getProjectDonationStats(projectId);
    }

    private displayDonationPaymentResult(
        paymentIntentResult?: PaymentIntentResult
    ) {
        if (paymentIntentResult) {
            if (paymentIntentResult.error) {
                this.toastrService.error(
                    'Podczas wykonywania płatności wystąpił błąd',
                    'Błąd płatności'
                );
            } else {
                this.toastrService.success(
                    'Twoja płatność została zlecona i zostanie wkrótce wykonana',
                    'Płatność zlecona'
                );
            }
        }
    }

    private async initializeStripe() {
        const stripe = await loadStripe(environment.stripeKey, {
            locale: 'pl',
        });
        if (stripe) {
            this.stripe.next(stripe);
            return;
        }
        throw new Error('Stripe could not be loaded');
    }
}
