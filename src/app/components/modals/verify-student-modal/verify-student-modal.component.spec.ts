import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStudentModalComponent } from './verify-student-modal.component';

describe('VerifyStudentModalComponent', () => {
  let component: VerifyStudentModalComponent;
  let fixture: ComponentFixture<VerifyStudentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyStudentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
