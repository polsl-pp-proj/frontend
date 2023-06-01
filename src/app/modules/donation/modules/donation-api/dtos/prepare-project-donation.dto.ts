export class PrepareProjectDonationDto {
    amount!: number;
    isAnonymous!: boolean;

    constructor(prepareProjectDonationDto: PrepareProjectDonationDto) {
        Object.assign(this, prepareProjectDonationDto);
    }
}
