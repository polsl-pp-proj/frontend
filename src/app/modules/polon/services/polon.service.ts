import { Injectable } from '@angular/core';
import { PolonAcademicInstitutionStatus } from '../modules/polon-api/types/polon-academic-institution-status.type';
import { PolonApiService } from '../modules/polon-api/services/polon-api.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolonService {
    constructor(private readonly polonApiService: PolonApiService) {}

    getAcademicInstitutions(...statusFilter: PolonAcademicInstitutionStatus[]) {
        return this.polonApiService.getAcademicInstitutions().pipe(
            map((institutions) => {
                return (
                    statusFilter.length
                        ? institutions.filter((institution) =>
                              statusFilter.includes(institution.status)
                          )
                        : institutions
                ).sort((a, b) => a.name.localeCompare(b.name));
            })
        );
    }
}
