import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

import { BaseModalComponent } from './base-modal.component';
import { ɵDomSanitizerImpl } from '@angular/platform-browser';

describe('BaseModalComponent', () => {
    let component: BaseModalComponent;
    let fixture: ComponentFixture<BaseModalComponent>;

    type ModalServiceStub = Partial<ModalService> & {
        subject: BehaviorSubject<boolean>;
    };
    type IconVaultServiceStub = Partial<IconVaultService> & {
        subject: BehaviorSubject<SafeHtml | null>;
    };
    let iconVaultServiceStub: IconVaultServiceStub;
    let modalServiceStub: ModalServiceStub;

    const modalName = 'test-modal';

    beforeEach(async () => {
        const domSanitizer = new ɵDomSanitizerImpl(document);

        iconVaultServiceStub = {
            subject: new BehaviorSubject<SafeHtml | null>(null),
            getIcon: (icon: string) => {
                iconVaultServiceStub.subject.next(
                    domSanitizer.bypassSecurityTrustHtml(`<svg>${icon}</svg>`)
                );
                return iconVaultServiceStub.subject.asObservable();
            },
        };

        modalServiceStub = {
            subject: new BehaviorSubject<boolean>(false),
            registerModal: (name: string) => {
                return modalServiceStub.subject.asObservable();
            },
            updateModalState: (name: string, state: 'open' | 'close') => {
                if (name !== 'invalid') {
                    modalServiceStub.subject.next(state === 'open');
                    return;
                }
                throw new Error('Modal does not exist');
            },
            unregisterModal: (name) => {
                modalServiceStub.subject.next(false);
                modalServiceStub.subject.complete();
                modalServiceStub.subject.unsubscribe();
            },
        };

        await TestBed.configureTestingModule({
            declarations: [BaseModalComponent],
            providers: [
                { provide: IconVaultService, useValue: iconVaultServiceStub },
                { provide: ModalService, useValue: modalServiceStub },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseModalComponent);
        component = fixture.componentInstance;
        component.modalName = modalName;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display modal title', () => {
        const title = 'Test Modal';
        component.modalTitle = title;
        fixture.detectChanges();
        const titleElement = fixture.debugElement.query(By.css('h1'));
        expect(titleElement.nativeElement.textContent.trim()).toEqual(title);
    });

    it('should display close icon when closable', () => {
        component.closable = true;
        fixture.detectChanges();
        const iconElement = fixture.debugElement.query(By.css('.close-icon'));
        expect(iconElement.nativeElement).toBeTruthy();
    });

    it('should not display close icon when not closable', () => {
        component.closable = false;
        fixture.detectChanges();
        const iconElement = fixture.debugElement.query(By.css('.close-icon'));
        expect(iconElement).toBeFalsy();
    });

    it('should emit closed event when modal is closed', () => {
        spyOn(component.closed, 'emit');
        const modalService = TestBed.inject(ModalService);
        modalService.registerModal(modalName);
        modalService.updateModalState(modalName, 'open');
        modalService.updateModalState(modalName, 'close');
        expect(component.closed.emit).toHaveBeenCalled();
    });

    it('should update modal state when clicked and closable', () => {
        spyOn(component, 'closeModal');
        component.closable = true;
        fixture.detectChanges();
        const modal = fixture.debugElement;
        modal.triggerEventHandler('click', null);
        expect(component.closeModal).toHaveBeenCalled();
    });

    it('should emit submit event when enter key is pressed', () => {
        spyOn(component.submit, 'emit');
        const event = new KeyboardEvent('keyup', { code: 'Enter' });
        fixture.debugElement.triggerEventHandler('keyup', event);
        expect(component.submit.emit).toHaveBeenCalled();
    });
});
