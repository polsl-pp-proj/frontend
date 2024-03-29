import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { authApiRoutes } from '../auth-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { LoginDto } from '../dtos/login.dto';
import { AuthTokensDto } from '../dtos/auth-tokens.dto';
import { HttpHeaders } from '@angular/common/http';
import { EmailAddressDto } from 'src/app/dtos/email-address.dto';
import { PasswordDto } from '../dtos/password.dto';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    constructor(private readonly coreApiService: CoreApiService) {}

    login(emailAddress: string, password: string) {
        return this.coreApiService.request<LoginDto, AuthTokensDto>(
            authApiRoutes.POST_login,
            new LoginDto({ emailAddress, password }),
            new ApiOptions() as ApiOptionsBody
        );
    }

    refresh(refreshToken: string) {
        return this.coreApiService.request<any, AuthTokensDto>(
            authApiRoutes.PATCH_refresh,
            {},
            new ApiOptions({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${refreshToken}`,
                }),
            }) as ApiOptionsBody
        );
    }

    logout(refreshToken: string) {
        return this.coreApiService.request<never, void>(
            authApiRoutes.DELETE_logout,
            new ApiOptions({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${refreshToken}`,
                }),
            }) as ApiOptionsBody
        );
    }

    requestPasswordReset(emailAddress: string) {
        return this.coreApiService.request<EmailAddressDto, void>(
            authApiRoutes.POST_requestPasswordReset,
            new EmailAddressDto(emailAddress),
            new ApiOptions() as ApiOptionsBody
        );
    }

    confirmPasswordReset(
        emailAddress: string,
        token: string,
        newPassword: string
    ) {
        return this.coreApiService.request<PasswordDto, void>(
            authApiRoutes.PATCH_confirmPasswordReset,
            new PasswordDto({ password: newPassword }),
            new ApiOptions({
                routeParams: { emailAddress, token },
            }) as ApiOptionsBody
        );
    }

    changePassword(newPassword: string) {
        return this.coreApiService.request<PasswordDto, void>(
            authApiRoutes.PATCH_changePassword,
            new PasswordDto({ password: newPassword }),
            new ApiOptions() as ApiOptionsBody
        );
    }
}
