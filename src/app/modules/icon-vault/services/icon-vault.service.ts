import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable, skipWhile, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IconVaultService {
    private icons: Record<string, BehaviorSubject<SafeHtml | null>> = {};

    constructor(private sanitizer: DomSanitizer) {}

    public getIcon(icon: string): Observable<SafeHtml | null> {
        if (!this.icons.hasOwnProperty(icon)) {
            this.icons[icon] = new BehaviorSubject<SafeHtml | null>(
                undefined as unknown as SafeHtml
            );

            import(`../../../../assets/img/icons/${icon}.svg`) // ../../../../ == /src
                .then(({ default: iconData }: { default: string }) => {
                    this.icons[icon].next(
                        this.sanitizer.bypassSecurityTrustHtml(iconData)
                    );
                })
                .catch((e) => {
                    this.icons[icon].error(
                        new Error(`Requested icon '${icon}' does not exist`)
                    );
                });
        }

        return this.icons[icon].asObservable().pipe(
            skipWhile((value) => value === undefined),
            take(1)
        );
    }
}
