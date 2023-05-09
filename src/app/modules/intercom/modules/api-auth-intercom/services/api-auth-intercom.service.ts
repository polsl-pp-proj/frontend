import { Injectable } from '@angular/core';
import { throttleTime } from 'rxjs';
import { ApiAuthService } from 'src/app/modules/api/services/api-auth.service';
import { AuthDataService } from 'src/app/modules/auth/services/auth-data.service';

@Injectable({
    providedIn: 'root',
})
export class ApiAuthIntercomService {
    constructor(
        private readonly authDataService: AuthDataService,
        private readonly apiAuthService: ApiAuthService
    ) {}

    init() {
        this.setAuthTokenSubscription();
        this.setWillExpireSoonSubscription();
    }

    private setAuthTokenSubscription() {
        this.authDataService.authToken
            .pipe(
                throttleTime(250, undefined, { leading: false, trailing: true })
            )
            .subscribe({
                next: (token) => {
                    if (token !== undefined) {
                        this.apiAuthService.updateAuthToken(token);
                    }
                },
            });
    }

    private setWillExpireSoonSubscription() {
        this.authDataService.willExpireSoon.subscribe({
            next: () => {
                this.apiAuthService.updateAuthToken(undefined);
            },
        });
    }
}
