import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModerationPageComponent } from './project-moderation-page.component';

describe('ProjectModerationPageComponent', () => {
  let component: ProjectModerationPageComponent;
  let fixture: ComponentFixture<ProjectModerationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectModerationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectModerationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
