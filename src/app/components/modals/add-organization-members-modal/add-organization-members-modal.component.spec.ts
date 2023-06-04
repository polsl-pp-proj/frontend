import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizationMembersModalComponent } from './add-organization-members-modal.component';

describe('AddOrganizationMembersModalComponent', () => {
  let component: AddOrganizationMembersModalComponent;
  let fixture: ComponentFixture<AddOrganizationMembersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrganizationMembersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrganizationMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
