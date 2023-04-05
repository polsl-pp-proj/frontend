import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPositionCardComponent } from './open-position-card.component';

describe('OpenPositionCardComponent', () => {
  let component: OpenPositionCardComponent;
  let fixture: ComponentFixture<OpenPositionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPositionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenPositionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
