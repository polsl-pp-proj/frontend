export class PaymentDto {
    userName!: string;
    amount!: number;

    constructor(paymentDto: PaymentDto) {
        Object.assign(this, paymentDto);
    }
}
