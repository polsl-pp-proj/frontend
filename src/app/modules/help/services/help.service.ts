import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
    BehaviorSubject,
    Observable,
    filter,
    mergeMap,
    skip,
    skipWhile,
    take,
} from 'rxjs';
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
    ) {
        this.init();
    }

    get currentPageHelpObservable() {
        return this.currentPageHelpChange.asObservable().pipe(
            mergeMap((innerObservable) => innerObservable),
            filter((value) => value !== undefined)
        );
    }

    registerPageHelp(pagePath: string) {
        if (!this.pageHelpDocs.hasOwnProperty(pagePath)) {
            this.createSubjectForPage(pagePath);
            this.importHelpDoc(pagePath).subscribe({
                next: () => {
                    this.currentPageHelpChange.emit(
                        this.pageHelpDocs[pagePath]
                    );
                },
            });
        } else {
            this.currentPageHelpChange.emit(this.pageHelpDocs[pagePath]);
        }
    }

    private createSubjectForPage(pagePath: string) {
        this.pageHelpDocs[pagePath] = new BehaviorSubject<SafeHtml | null>(
            undefined as unknown as SafeHtml
        );
    }

    private importHelpDoc(pagePath: string) {
        return new Observable<void>((subscriber) => {
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
                                subscriber.next();
                                subscriber.complete();
                            },
                            error: (err) => {
                                const error = new Error(
                                    `Help for page '${pagePath}' is not valid markdown`
                                );
                                this.pageHelpDocs[pagePath].error(error);
                                subscriber.error(error);
                                subscriber.complete();
                            },
                        });
                })
                .catch((e) => {
                    const error = new Error(
                        `Requested help for page '${pagePath}' does not exist`
                    );
                    this.pageHelpDocs[pagePath].error(error);
                    subscriber.error(error);
                    subscriber.complete();
                });
        });
    }

    private async init() {
        const pagePath = 'error-help-info';
        this.createSubjectForPage(pagePath);
        this.markdownService
            .parse(
                `# Wystąpił błąd\nPodczas próby załadowania pomocy dla tej strony wystąpił błąd.`,
                {
                    xhtml: true,
                    gfm: false,
                }
            )
            .subscribe({
                next: (parsedHelpDoc) => {
                    this.pageHelpDocs[pagePath].next(
                        this.sanitizer.bypassSecurityTrustHtml(parsedHelpDoc)
                    );
                },
            });
    }
}
