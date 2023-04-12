import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPaymentCardComponent } from './recent-payment-card.component';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

describe('RecentPaymentCardComponent', () => {
    let component: RecentPaymentCardComponent;
    let fixture: ComponentFixture<RecentPaymentCardComponent>;

    beforeEach(async () => {
        registerLocaleData(localePl);
        await TestBed.configureTestingModule({
            declarations: [RecentPaymentCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecentPaymentCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the default username', () => {
        const nameElement = fixture.nativeElement.querySelector('.name');
        expect(nameElement.innerText.trim()).toBe('Anonim');
    });

    it('should display the provided username', () => {
        component.userName = 'John Doe';
        fixture.detectChanges();
        const nameElement = fixture.nativeElement.querySelector('.name');
        expect(nameElement.innerText.trim()).toBe('John Doe');
    });

    it('should display the amount in PLN currency format', () => {
        component.amount = 1000;
        fixture.detectChanges();
        const amountElement = fixture.nativeElement.querySelector('.amount');
        expect(amountElement.innerText.normalize()).toBe(
            '1 000,00 zł'.normalize()
        );
    });

    it('should display zero amount in PLN currency format', () => {
        component.amount = 0;
        fixture.detectChanges();
        const amountElement = fixture.nativeElement.querySelector('.amount');
        expect(amountElement.innerText.normalize()).toBe('0,00 zł'.normalize());
    });
});
