import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonWebToken } from '../../auth/types/jwt.type';

@Injectable({
    providedIn: 'root',
})
export class ApiAuthService {
    private authToken = new BehaviorSubject<JsonWebToken | null | undefined>(
        undefined
    );

    constructor() {}

    get token(): Observable<JsonWebToken | null | undefined> {
        return this.authToken.asObservable();
    }

    updateAuthToken(token: JsonWebToken | null | undefined) {
        this.authToken.next(token);
    }
}
