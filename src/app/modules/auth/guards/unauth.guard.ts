import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, skipWhile } from 'rxjs';
import { AuthDataService } from '../services/auth-data.service';

export const unauthGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authDataService = inject(AuthDataService);
    return authDataService.authenticated.pipe(
        skipWhile((authenticated) => authenticated === undefined),
        map((authenticated) => !authenticated)
    ) as Observable<boolean>;
};
