import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable, mergeMap, skipWhile, take } from 'rxjs';
import { MarkdownService } from '../../markdown/services/markdown.service';

@Injectable({
    providedIn: 'root',
})
export class HelpService {
    private pageHelpDocs: Record<string, BehaviorSubject<SafeHtml | null>> = {};
    private currentPageHelpChange = new EventEmitter<
        Observable<SafeHtml | null>
    >();

    constructor(
        private readonly sanitizer: DomSanitizer,
        private readonly markdownService: MarkdownService
    ) {}

    get currentPageHelpObservable() {
        return this.currentPageHelpChange.asObservable().pipe(
            mergeMap((innerObservable) => innerObservable),
            skipWhile((value) => value === undefined),
            take(1)
        );
    }

    registerPageHelp(pagePath: string) {
        if (!this.pageHelpDocs.hasOwnProperty(pagePath)) {
            this.createSubjectForPage(pagePath);
            this.importHelpDoc(pagePath);
        }
        this.currentPageHelpChange.emit(this.pageHelpDocs[pagePath]);
    }

    private createSubjectForPage(pagePath: string) {
        this.pageHelpDocs[pagePath] = new BehaviorSubject<SafeHtml | null>(
            undefined as unknown as SafeHtml
        );
    }

    private importHelpDoc(pagePath: string) {
        import(`../../../views/${pagePath}/help.md`) // ../../../ == /app
            .then(({ default: helpDocMarkdown }: { default: string }) => {
                this.markdownService
                    .parse(helpDocMarkdown, {
                        xhtml: true,
                        gfm: false,
                    })
                    .subscribe({
                        next: (parsedHelpDoc) => {
                            this.pageHelpDocs[pagePath].next(
                                this.sanitizer.bypassSecurityTrustHtml(
                                    parsedHelpDoc
                                )
                            );
                        },
                        error: (err) => {},
                    });
            })
            .catch((e) => {
                this.pageHelpDocs[pagePath].error(
                    new Error(
                        `Requested help for page '${pagePath}' does not exist`
                    )
                );
            });
    }
}
