export class OpenPositionDto {
    id!: number;
    name!: string;
    description!: string;
    requirements!: string[];

    constructor(openPositionDto: OpenPositionDto) {
        Object.assign(this, openPositionDto);
    }
}
