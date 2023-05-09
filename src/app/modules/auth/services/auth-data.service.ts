import { EventEmitter, Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import {
    BehaviorSubject,
    distinctUntilChanged,
    map,
    Observable,
    Subscription,
    timer,
} from 'rxjs';
import { randomInteger } from '../../../helpers/random-number.helper';
import { DataStorageType } from '../../data-storage/enums/data-storage-type.enum';
import { DataStorageService } from '../../data-storage/services/data-storage.service';
import { AuthTokenPayloadDto } from '../dtos/auth-token-payload.dto';
import { AuthTokensDto } from '../modules/auth-api/dtos/auth-tokens.dto';
import { JsonWebToken } from '../types/jwt.type';

const refreshBefore = 60000; // in ms
const refreshLeeway = 5000; // in ms

@Injectable({
    providedIn: 'root',
})
export class AuthDataService {
    private readonly leeway = randomInteger(-refreshLeeway, refreshLeeway); // in ms

    private authToken$ = new BehaviorSubject<JsonWebToken | null | undefined>(
        undefined
    );
    private willExpireSoon$ = new EventEmitter<void>();
    private willExpireSoonTimerSubscription!: Subscription;

    constructor(private readonly dataStorageService: DataStorageService) {
        this.init();
    }

    private async init() {
        this.updateAuthenticationStatus();
    }

    /******************************* Observables ******************************/
    get authenticated(): Observable<boolean | undefined> {
        return this.authToken$.pipe(
            map((authToken) =>
                authToken === undefined ? undefined : !!authToken
            ),
            distinctUntilChanged()
        );
    }

    get authToken(): Observable<JsonWebToken | null | undefined> {
        return this.authToken$.asObservable();
    }

    get authTokenPayload(): Observable<AuthTokenPayloadDto | null | undefined> {
        return this.authToken$.pipe(
            map((authToken) =>
                !!authToken
                    ? this.decodeToken<AuthTokenPayloadDto>(authToken)
                    : <null | undefined>authToken
            )
        );
    }

    get willExpireSoon(): Observable<void> {
        return this.willExpireSoon$.asObservable();
    }

    /*************************** Token manipulation ***************************/
    async processNewTokens(
        authToken: JsonWebToken,
        refreshToken: JsonWebToken
    ) {
        await this.setTokens(authToken, refreshToken);
        this.gotAuthenticated(authToken);
    }

    async removeTokens() {
        await this.setTokens(null, null);
        this.gotUnauthenticated();
    }

    getTokens(): AuthTokensDto {
        return this.dataStorageService.get(DataStorageType.Auth);
    }

    private async setTokens(
        authToken: JsonWebToken | null,
        refreshToken: JsonWebToken | null
    ) {
        await this.dataStorageService.set(DataStorageType.Auth, {
            authToken,
            refreshToken,
        });
    }

    private decodeToken<T = object>(token: JsonWebToken): T {
        return jwtDecode<T>(token);
    }

    /*************************** Expiry manipulation **************************/
    private setExpiryEmitter({ exp: expiryTimestamp }: { exp: number }) {
        const willExpireSoonAt =
            expiryTimestamp * 1000 -
            (new Date().valueOf() + refreshBefore + this.leeway);

        this.willExpireSoonTimerSubscription = timer(
            willExpireSoonAt
        ).subscribe(() => {
            this.willExpireSoon$.emit();
        });
    }

    private resetExpirySubscription() {
        this.willExpireSoonTimerSubscription?.unsubscribe();
    }

    /*********************** Authenticated manipulation ***********************/
    private gotAuthenticated(authToken: string) {
        const tokenPayload = this.decodeToken<
            AuthTokenPayloadDto & { exp: number }
        >(authToken);
        this.authToken$.next(authToken);

        this.setExpiryEmitter(tokenPayload);
    }

    private gotUnauthenticated() {
        this.authToken$.next(null);

        this.resetExpirySubscription();
    }

    private async updateAuthenticationStatus() {
        const { authToken, refreshToken } = await this.getTokens();
        if (authToken && refreshToken) {
            this.gotAuthenticated(authToken);
        } else {
            this.gotUnauthenticated();
        }
    }
}
