import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateProjectsPageComponent } from './administrate-projects-page.component';

describe('AdministrateProjectsPageComponent', () => {
  let component: AdministrateProjectsPageComponent;
  let fixture: ComponentFixture<AdministrateProjectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateProjectsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrateProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
