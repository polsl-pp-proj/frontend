import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPaymentCardComponent } from './recent-payment-card.component';

describe('RecentPaymentCardComponent', () => {
  let component: RecentPaymentCardComponent;
  let fixture: ComponentFixture<RecentPaymentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPaymentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
