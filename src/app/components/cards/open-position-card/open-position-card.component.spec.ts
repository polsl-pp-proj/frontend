import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPositionCardComponent } from './open-position-card.component';
import { By } from '@angular/platform-browser';

describe('OpenPositionCardComponent', () => {
    let component: OpenPositionCardComponent;
    let fixture: ComponentFixture<OpenPositionCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpenPositionCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OpenPositionCardComponent);
        component = fixture.componentInstance;
        component.positionName = 'Test Position';
        component.positionDescription = 'Test description';
        component.positionRequirements = [
            'Requirement 1',
            'Requirement 2',
            'Requirement 3',
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display position name', () => {
        const nameElement = fixture.debugElement.query(By.css('.name'));
        expect(nameElement.nativeElement.textContent).toContain(
            component.positionName
        );
    });

    it('should display position description', () => {
        const descriptionElement = fixture.debugElement.query(
            By.css('.description')
        );
        expect(descriptionElement.nativeElement.textContent).toContain(
            component.positionDescription
        );
    });

    it('should display position requirements', () => {
        const requirementsElements = fixture.debugElement.queryAll(
            By.css('.requirements li')
        );
        expect(requirementsElements.length).toEqual(
            component.positionRequirements.length
        );
        for (let i = 0; i < requirementsElements.length; i++) {
            expect(requirementsElements[i].nativeElement.textContent).toContain(
                component.positionRequirements[i]
            );
        }
    });

    it('should emit join event when button is clicked', () => {
        spyOn(component.join, 'emit');
        const buttonElement = fixture.debugElement.query(By.css('.join-btn'));
        buttonElement.triggerEventHandler('click', null);
        expect(component.join.emit).toHaveBeenCalled();
    });
});
