import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveOrganizationMembersModalComponent } from './remove-organization-members-modal.component';

describe('RemoveOrganizationMembersModalComponent', () => {
  let component: RemoveOrganizationMembersModalComponent;
  let fixture: ComponentFixture<RemoveOrganizationMembersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveOrganizationMembersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveOrganizationMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
