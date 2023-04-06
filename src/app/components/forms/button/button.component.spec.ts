import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By, DomSanitizer } from '@angular/platform-browser';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let domSanitizer: DomSanitizer;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        domSanitizer = TestBed.inject(DomSanitizer);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('type', () => {
        it('should have "button-clear" class when type is "clear"', () => {
            component.type = 'clear';
            fixture.detectChanges();
            const buttonEl = fixture.debugElement.query(
                By.css('.button')
            ).nativeElement;
            expect(buttonEl.classList).toContain('button-clear');
        });

        it('should have "button-translucent" class when type is "translucent"', () => {
            component.type = 'translucent';
            fixture.detectChanges();
            const buttonEl = fixture.debugElement.query(
                By.css('.button')
            ).nativeElement;
            expect(buttonEl.classList).toContain('button-translucent');
        });

        it('should have "button-color" class when type is "color"', () => {
            component.type = 'color';
            fixture.detectChanges();
            const buttonEl = fixture.debugElement.query(
                By.css('.button')
            ).nativeElement;
            expect(buttonEl.classList).toContain('button-color');
        });

        it('should default to "button-clear" class when type is not set', () => {
            fixture.detectChanges();
            const buttonEl = fixture.debugElement.query(
                By.css('.button')
            ).nativeElement;
            expect(buttonEl.classList).toContain('button-clear');
        });
    });

    describe('icon', () => {
        it('should display the icon when it is set', () => {
            component.icon =
                domSanitizer.bypassSecurityTrustHtml('<svg></svg>');
            fixture.detectChanges();
            const iconEl = fixture.debugElement.query(
                By.css('.button-icon')
            ).nativeElement;
            expect(iconEl.innerHTML).toContain('<svg></svg>');
        });

        it('should not display the icon when it is not set', () => {
            component.icon = undefined;
            fixture.detectChanges();
            const iconEl = fixture.debugElement.query(By.css('.button-icon'));
            expect(iconEl).toBeFalsy();
        });
    });

    describe('iconPosition', () => {
        it('should display the icon before the text when iconPosition is "before"', () => {
            component.icon =
                domSanitizer.bypassSecurityTrustHtml('<svg></svg>');
            component.iconPosition = 'before';

            const buttonEl = fixture.debugElement.query(By.css('.button'));
            const buttonText = buttonEl.query(By.css('.button-text'));

            buttonText.nativeElement.innerText = 'Some text';
            fixture.detectChanges();

            const buttonIcon = buttonEl.query(By.css('.button-icon'));

            expect(Object.keys(buttonIcon.classes)).toContain(
                'button-icon-before'
            );
            expect(buttonEl.children[0]).toBe(buttonIcon);
            expect(buttonEl.children[1]).toBe(buttonText);
        });

        it('should display the icon after the text when iconPosition is "after"', () => {
            component.icon =
                domSanitizer.bypassSecurityTrustHtml('<svg></svg>');
            component.iconPosition = 'after';
            const buttonEl = fixture.debugElement.query(By.css('.button'));
            const buttonText = buttonEl.query(By.css('.button-text'));

            buttonText.nativeElement.innerText = 'Some text';
            fixture.detectChanges();

            const buttonIcon = buttonEl.query(By.css('.button-icon'));

            expect(Object.keys(buttonIcon.classes)).toContain(
                'button-icon-after'
            );
            expect(buttonEl.children[0]).toBe(buttonText);
            expect(buttonEl.children[1]).toBe(buttonIcon);
        });

        it('should have iconOnly true when text is empty and icon is set', () => {
            component.icon =
                domSanitizer.bypassSecurityTrustHtml('<svg></svg>');
            fixture.detectChanges();

            expect(component.iconOnly).toBe(true);
        });

        it('should have iconOnly false when text is not empty and icon is set', () => {
            component.icon =
                domSanitizer.bypassSecurityTrustHtml('<svg></svg>');
            fixture.detectChanges();
            const textElement: HTMLElement =
                fixture.nativeElement.querySelector('.button .button-text');
            textElement.innerText = 'Some text';

            expect(component.iconOnly).toBe(false);
        });

        it('should have iconOnly true when text is empty and icon is not set', () => {
            fixture.detectChanges();

            expect(component.iconOnly).toBe(true);
        });

        it('should have iconOnly false when text is not empty and icon is not set', () => {
            fixture.detectChanges();

            const textElement: HTMLElement =
                fixture.nativeElement.querySelector('.button .button-text');
            textElement.innerText = 'Some text';

            expect(component.iconOnly).toBe(false);
        });
    });
});
