export class ApplyForOpenPositionDto {
    candidateSummary!: string;

    constructor(applyForOpenPositionDto: ApplyForOpenPositionDto) {
        Object.assign(this, applyForOpenPositionDto);
    }
}
