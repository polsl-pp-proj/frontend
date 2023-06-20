export class EmailTokenParamsDto {
    emailAddress!: string;
    oneTimeToken!: string;

    constructor(emailTokenParamsDto: EmailTokenParamsDto) {
        Object.assign(this, emailTokenParamsDto);
    }
}
