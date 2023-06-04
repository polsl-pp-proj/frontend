import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeablePhotoGalleryComponent } from './changeable-photo-gallery.component';

describe('ChangeablePhotoGalleryComponent', () => {
    let component: ChangeablePhotoGalleryComponent;
    let fixture: ComponentFixture<ChangeablePhotoGalleryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangeablePhotoGalleryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChangeablePhotoGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
