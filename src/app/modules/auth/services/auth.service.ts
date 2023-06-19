import { Injectable } from '@angular/core';
import { AuthDataService } from './auth-data.service';
import { AuthApiService } from '../modules/auth-api/services/auth-api.service';
import { Observable, from, map, mergeMap, retry, tap } from 'rxjs';
import { EmailTokenParamsDto } from '../modules/auth-api/dtos/email-token-params.dto';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private lastEmailTokenParams?: EmailTokenParamsDto;

    constructor(
        private readonly authDataService: AuthDataService,
        private readonly authApiService: AuthApiService
    ) {
        this.init();
    }

    get authenticated() {
        return this.authDataService.authenticated;
    }

    get authToken() {
        return this.authDataService.authToken;
    }

    get authTokenPayload() {
        return this.authDataService.authTokenPayload;
    }

    login(emailAddress: string, password: string) {
        return this.authApiService.login(emailAddress, password).pipe(
            tap(async ({ authToken, refreshToken }) => {
                await this.authDataService.processNewTokens(
                    authToken,
                    refreshToken
                );
            }),
            map(() => {
                return;
            })
        );
    }

    refresh() {
        return this.authApiService
            .refresh(this.authDataService.getTokens().refreshToken)
            .pipe(
                tap(async ({ authToken, refreshToken }) => {
                    await this.authDataService.processNewTokens(
                        authToken,
                        refreshToken
                    );
                }),
                retry(1),
                map(() => {
                    return;
                })
            );
    }

    logout() {
        return this.authApiService
            .logout(this.authDataService.getTokens().refreshToken)
            .pipe(mergeMap(() => from(this.authDataService.removeTokens())));
    }

    requestPasswordReset(emailAddress: string) {
        return this.authApiService.requestPasswordReset(emailAddress);
    }

    confirmPasswordReset(newPassword: string) {
        try {
            const lastEmailTokenParams = this.consumeEmailTokenParams();
            return this.authApiService.confirmPasswordReset(
                lastEmailTokenParams.emailAddress,
                lastEmailTokenParams.oneTimeToken,
                newPassword
            );
        } catch (err) {
            return new Observable((subscriber) => {
                subscriber.error(err);
                subscriber.complete();
            });
        }
    }

    changePassword(newPassword: string) {
        return this.authApiService.changePassword(newPassword);
    }

    setEmailTokenParams(emailAddress: string, token: string) {
        this.lastEmailTokenParams = new EmailTokenParamsDto({
            emailAddress,
            oneTimeToken: token,
        });
    }

    private consumeEmailTokenParams() {
        if (this.lastEmailTokenParams) {
            const lastEmailTokenParams = this.lastEmailTokenParams;
            this.lastEmailTokenParams = undefined;
            return lastEmailTokenParams as EmailTokenParamsDto;
        }
        throw new Error('email_token_params_undefined');
    }

    init() {
        this.authDataService.willExpireSoon.subscribe({
            next: () => {
                this.refresh().subscribe();
            },
        });
    }
}
