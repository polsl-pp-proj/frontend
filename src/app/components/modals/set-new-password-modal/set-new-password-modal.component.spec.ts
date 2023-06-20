import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewPasswordModalComponent } from './set-new-password-modal.component';

describe('SetNewPasswordModalComponent', () => {
  let component: SetNewPasswordModalComponent;
  let fixture: ComponentFixture<SetNewPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetNewPasswordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetNewPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
