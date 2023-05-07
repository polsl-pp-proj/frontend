export class RequestPasswordResetDto {
    emailAddress: string;

    constructor(emailAddress: string) {
        this.emailAddress = emailAddress;
    }
}
