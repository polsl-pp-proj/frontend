export class PastPaymentDto {
    amount!: number;
    projectId!: number;
    projectName!: string;
    anonymous!: boolean;

    constructor(paymentDto: PastPaymentDto) {
        Object.assign(this, paymentDto);
    }
}
