export class NewOpenPositionDto {
    name!: string;
    description!: string;
    requirements!: string[];

    constructor(newOpenPositionDto: NewOpenPositionDto) {
        Object.assign(this, newOpenPositionDto);
    }
}
