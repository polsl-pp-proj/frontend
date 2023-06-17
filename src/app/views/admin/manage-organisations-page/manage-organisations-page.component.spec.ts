import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganisationsPageComponent } from './manage-organisations-page.component';

describe('ManageOrganisationsPageComponent', () => {
  let component: ManageOrganisationsPageComponent;
  let fixture: ComponentFixture<ManageOrganisationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOrganisationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOrganisationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
