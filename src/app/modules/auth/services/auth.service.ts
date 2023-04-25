import { Injectable } from '@angular/core';
import { AuthDataService } from './auth-data.service';
import { AuthApiService } from '../modules/auth-api/services/auth-api.service';
import { map, retry, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
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

    init() {
        this.authDataService.willExpireSoon.subscribe({
            next: () => {
                this.refresh().subscribe();
            },
        });
    }
}
