import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { SignupDto } from '../dtos/signup.dto';
import { signupApiRoutes } from '../signup-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';

@Injectable({
    providedIn: 'root',
})
export class SignupApiService {
    constructor(private readonly coreApiService: CoreApiService) {}

    signup(signupData: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        password: string;
        consent: boolean;
    }) {
        return this.coreApiService.request<SignupDto, void>(
            signupApiRoutes.POST_signup,
            new SignupDto(signupData),
            new ApiOptions() as ApiOptionsBody
        );
    }

    confirmSignup(emailAddress: string, token: string) {
        return this.coreApiService.request<any, void>(
            signupApiRoutes.PATCH_confirmSignup,
            {},
            new ApiOptions({
                routeParams: { emailAddress, token },
            }) as ApiOptionsBody
        );
    }
}
