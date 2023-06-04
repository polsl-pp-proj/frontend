import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectPageComponent } from './add-project-page.component';

describe('AddProjectPageComponent', () => {
  let component: AddProjectPageComponent;
  let fixture: ComponentFixture<AddProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
