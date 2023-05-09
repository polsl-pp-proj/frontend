export class LoginDto {
    emailAddress!: string;
    password!: string;

    constructor(loginDto: LoginDto) {
        Object.assign(this, loginDto);
    }
}
