import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsModerationPageComponent } from './projects-moderation-page.component';

describe('ProjectsModerationPageComponent', () => {
  let component: ProjectsModerationPageComponent;
  let fixture: ComponentFixture<ProjectsModerationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsModerationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsModerationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
