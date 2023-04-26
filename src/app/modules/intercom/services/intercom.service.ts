import { Injectable } from '@angular/core';
import { ApiAuthIntercomService } from '../modules/api-auth-intercom/services/api-auth-intercom.service';

@Injectable({
    providedIn: 'root',
})
export class IntercomService {
    constructor(
        private readonly apiAuthIntercomService: ApiAuthIntercomService
    ) {}

    init() {
        this.apiAuthIntercomService.init();
    }
}
