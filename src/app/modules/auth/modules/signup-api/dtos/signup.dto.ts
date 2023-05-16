export class SignupDto {
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    password!: string;
    consent!: boolean;

    constructor(signupDto: SignupDto) {
        Object.assign(this, signupDto);
    }
}
