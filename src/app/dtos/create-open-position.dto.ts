export class CreateOpenPositionDto {
    name!: string;
    description!: string;
    requirements!: string[];

    constructor(newOpenPositionDto: CreateOpenPositionDto) {
        Object.assign(this, newOpenPositionDto);
    }
}
