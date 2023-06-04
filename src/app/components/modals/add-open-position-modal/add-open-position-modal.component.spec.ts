import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpenPositionModalComponent } from './add-open-position-modal.component';

describe('AddOpenPositionModalComponent', () => {
  let component: AddOpenPositionModalComponent;
  let fixture: ComponentFixture<AddOpenPositionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpenPositionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOpenPositionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
