import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [FormsModule, ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set disabled state', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBeTrue();
        fixture.detectChanges();
        const inputEl = fixture.nativeElement.querySelector('input');
        expect(inputEl.disabled).toBeTrue();
    });

    it('should set readonly state', () => {
        component.readOnly = true;
        expect(component.readOnly).toBeTrue();
        fixture.detectChanges();
        const inputEl = fixture.nativeElement.querySelector('input');
        expect(inputEl.readOnly).toBeTrue();
    });

    it('should render error message when there are errors and displayErrors is true', () => {
        component.errors = { required: true };
        component.displayErrors = true;
        component.errorMessages = { required: 'This field is required.' };
        fixture.nativeElement.classList.add(
            'ng-invalid',
            'ng-touched',
            'ng-dirty'
        );
        fixture.detectChanges();
        const errorMessage =
            fixture.nativeElement.querySelector('.error-message');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toBe('This field is required.');
    });

    it('should render empty error message when there are no errors', () => {
        component.errors = null;
        component.displayErrors = true;
        fixture.nativeElement.classList.add(
            'ng-invalid',
            'ng-touched',
            'ng-dirty'
        );
        fixture.detectChanges();
        const errorMessage =
            fixture.nativeElement.querySelector('.error-message');
        expect(errorMessage.innerText.normalize()).toBe(' '.normalize());
    });

    it('should not render error message when displayErrors is false', () => {
        component.errors = { required: true };
        component.displayErrors = false;
        fixture.nativeElement.classList.add(
            'ng-invalid',
            'ng-touched',
            'ng-dirty'
        );
        fixture.detectChanges();
        const errorMessage =
            fixture.nativeElement.querySelector('.error-message');
        expect(errorMessage).toBeFalsy();
    });

    it('should render default error message when no error message is provided', () => {
        component.errors = { required: true };
        fixture.nativeElement.classList.add(
            'ng-invalid',
            'ng-touched',
            'ng-dirty'
        );
        fixture.detectChanges();
        const errorMessageEl =
            fixture.nativeElement.querySelector('.error-message');
        expect(errorMessageEl.textContent).toContain('Wypełnij poprawnie pole');
    });

    it('should call onChange when input value changes', () => {
        spyOn(component, 'onChange');
        const inputEl = fixture.nativeElement.querySelector('input');
        inputEl.value = 'test';
        inputEl.dispatchEvent(new Event('input'));
        expect(component.onChange).toHaveBeenCalledWith('test');
    });

    it('should call onTouched when input is blurred', () => {
        spyOn(component, 'onTouched');
        const inputEl = fixture.nativeElement.querySelector('input');
        inputEl.dispatchEvent(new Event('blur'));
        expect(component.onTouched).toHaveBeenCalled();
    });

    it('should update value from form', () => {
        const newValue = 'test value';
        component.writeValue(newValue);
        expect(component.value).toEqual(newValue);
        fixture.detectChanges();
        const inputEl = fixture.nativeElement.querySelector('input');
        expect(inputEl.value).toEqual(newValue);
    });
});
