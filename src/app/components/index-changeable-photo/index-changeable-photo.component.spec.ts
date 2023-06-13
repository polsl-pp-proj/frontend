import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexChangeablePhotoComponent } from './index-changeable-photo.component';

describe('IndexChangeablePhotoComponent', () => {
  let component: IndexChangeablePhotoComponent;
  let fixture: ComponentFixture<IndexChangeablePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexChangeablePhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexChangeablePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
