import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, skipWhile, take, timer } from 'rxjs';
import { IconVaultService } from './icon-vault.service';

describe('IconVaultService', () => {
    let service: IconVaultService;
    let domSanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IconVaultService);
        domSanitizer = TestBed.inject(DomSanitizer);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getIcon', () => {
        const icon = 'test-icon';

        it('should return an observable with a value when an icon is found', (done) => {
            const iconData = `<svg>Test Icon</svg>`;
            spyOn(service as any, 'createSubjectForIcon').and.callThrough();
            spyOn(service as any, 'importIcon').and.callFake(() => {
                timer(0).subscribe(() => {
                    service['icons'][icon].next(
                        domSanitizer.bypassSecurityTrustHtml(iconData)
                    );
                });
            });

            service.getIcon(icon).subscribe({
                next: (value) => {
                    expect(service['createSubjectForIcon']).toHaveBeenCalled();
                    expect(service['importIcon']).toHaveBeenCalled();
                    expect(value).toEqual(
                        domSanitizer.bypassSecurityTrustHtml(iconData)
                    );
                    done();
                },
                error: (error) => {
                    fail(error);
                },
            });
        }, 10000);

        it('should return an error when an icon is not found', (done) => {
            spyOn(service as any, 'createSubjectForIcon').and.callThrough();
            spyOn(service as any, 'importIcon').and.callThrough();

            service.getIcon(icon).subscribe({
                next: (value) => {
                    fail(value);
                },
                error: (error) => {
                    expect(service['createSubjectForIcon']).toHaveBeenCalled();
                    expect(service['importIcon']).toHaveBeenCalled();
                    expect(error).toBeDefined();
                    done();
                },
            });
        });

        it('should return the cached icon', (done) => {
            const iconData = `<svg>Test Icon</svg>`;
            spyOn(service as any, 'createSubjectForIcon').and.callThrough();
            spyOn(service as any, 'importIcon').and.callFake(() => {
                timer(0).subscribe(() => {
                    service['icons'][icon].next(
                        domSanitizer.bypassSecurityTrustHtml(iconData)
                    );
                });
            });
            service.getIcon(icon).subscribe();
            service.getIcon(icon).subscribe();
            service.getIcon(icon).subscribe({
                next: (value) => {
                    expect(
                        service['createSubjectForIcon']
                    ).toHaveBeenCalledTimes(1);
                    expect(service['importIcon']).toHaveBeenCalledTimes(1);
                    expect(value).toBeDefined();
                    expect(value).toEqual(
                        domSanitizer.bypassSecurityTrustHtml(iconData)
                    );
                    done();
                },
                error: (error) => {
                    fail(error);
                },
            });
        });
    });
});
