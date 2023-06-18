import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganizationsPageComponent } from './manage-organizations-page.component';

describe('ManageOrganizationsPageComponent', () => {
    let component: ManageOrganizationsPageComponent;
    let fixture: ComponentFixture<ManageOrganizationsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ManageOrganizationsPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ManageOrganizationsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
