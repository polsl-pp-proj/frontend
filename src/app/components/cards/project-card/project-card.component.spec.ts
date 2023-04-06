import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { ButtonComponent } from '../../forms/button/button.component';

describe('ProjectCardComponent', () => {
    let component: ProjectCardComponent;
    let fixture: ComponentFixture<ProjectCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectCardComponent, ButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct image', () => {
        const imageUrl = 'https://placehold.co/1200x630';
        const imageAlt = 'Test image';
        component.imageUrl = imageUrl;
        component.imageAlt = imageAlt;
        fixture.detectChanges();
        const img = fixture.nativeElement.querySelector('.thumbnail');
        expect(img).toBeTruthy();
        expect(img.src).toBe(imageUrl);
        expect(img.alt).toBe(imageAlt);
    });

    it('should display the correct project name', () => {
        const projectName = 'Test project';
        component.projectName = projectName;
        fixture.detectChanges();
        const name = fixture.nativeElement.querySelector('.name');
        expect(name).toBeTruthy();
        expect(name.innerText).toBe(projectName);
    });

    it('should display the correct project description', () => {
        const projectDescription = 'Test description';
        component.projectDescription = projectDescription;
        fixture.detectChanges();
        const description = fixture.nativeElement.querySelector('.description');
        expect(description).toBeTruthy();
        expect(description.innerText).toBe(projectDescription);
    });

    it('should display the correct project organization', () => {
        const projectOrg = 'Test organization';
        component.projectOrg = projectOrg;
        fixture.detectChanges();
        const org = fixture.nativeElement.querySelector('.organization');
        expect(org).toBeTruthy();
        expect(org.innerText).toBe(projectOrg);
    });

    it('should emit visitProject event when visit button is clicked', () => {
        spyOn(component.visitProject, 'emit');
        const button = fixture.nativeElement.querySelector('.visit-btn');
        button.click();
        expect(component.visitProject.emit).toHaveBeenCalled();
    });
});
