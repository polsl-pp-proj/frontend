import { Injectable } from '@angular/core';
import { SignupApiService } from '../modules/signup-api/services/signup-api.service';

@Injectable({
    providedIn: 'root',
})
export class SignupService {
    constructor(private readonly signupApiService: SignupApiService) {}

    signup(signupData: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        password: string;
        consent: boolean;
    }) {
        return this.signupApiService.signup(signupData);
    }
    confirmSignup(emailAddress: string, token: string) {
        return this.signupApiService.confirmSignup(emailAddress, token);
    }
}
