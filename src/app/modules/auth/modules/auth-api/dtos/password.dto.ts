export class PasswordDto {
    password!: string;

    constructor(passwordDto: PasswordDto) {
        Object.assign(this, passwordDto);
    }
}
