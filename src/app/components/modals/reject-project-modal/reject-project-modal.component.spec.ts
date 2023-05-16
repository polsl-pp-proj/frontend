import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectProjectModalComponent } from './reject-project-modal.component';

describe('RejectProjectModalComponent', () => {
  let component: RejectProjectModalComponent;
  let fixture: ComponentFixture<RejectProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectProjectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
