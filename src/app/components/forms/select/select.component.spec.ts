import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SelectComponent', () => {
    let component: SelectComponent<string>;
    let fixture: ComponentFixture<SelectComponent<string>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [SelectComponent<string>],
        }).compileComponents();

        fixture = TestBed.createComponent(SelectComponent<string>);
        component = fixture.componentInstance;
        component.name = 'test';
        component.options = [
            { text: 'Option 1', value: '1' },
            { text: 'Option 2', value: '2' },
            { text: 'Option 3', value: '3', disabled: true },
        ];
        component.errorMessages = {
            required: 'This field is required',
            minlength: 'The minimum length is 3',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render options', () => {
        const options = fixture.debugElement.queryAll(By.css('option'));
        expect(options.length).toBe(3);
        expect(options[0].nativeElement.innerText.trim()).toBe('Option 1');
        expect(options[0].nativeElement.value).toBe("0: '1'");
        expect(options[1].nativeElement.innerText.trim()).toBe('Option 2');
        expect(options[1].nativeElement.value).toBe("1: '2'");
        expect(options[2].nativeElement.innerText.trim()).toBe('Option 3');
        expect(options[2].nativeElement.value).toBe("2: '3'");
        expect(options[2].nativeElement.disabled).toBe(true);
    });

    it('should render default reset option', () => {
        component.resetText = 'Select an option';
        fixture.detectChanges();
        const options = fixture.debugElement.queryAll(By.css('option'));
        expect(options.length).toBe(4);
        expect(options[0].nativeElement.innerText.trim()).toBe(
            'Select an option'
        );
        expect(options[0].nativeElement.value).toBe('3: null');
    });

    it('should render the reset option if provided and not multiple', () => {
        component.name = 'test-select';
        component.options = [
            { text: 'Option 1', value: 'option-1' },
            { text: 'Option 2', value: 'option-2' },
        ];
        component.resetText = 'Select an option';
        fixture.detectChanges();

        const options = fixture.debugElement.queryAll(By.css('option'));
        expect(options.length).toBe(3);
        expect(options[0].nativeElement.textContent.trim()).toBe(
            'Select an option'
        );
        expect(options[0].nativeElement.getAttribute('value')).toBe('3: null');
    });

    it('should not render the reset option if provided and multiple', () => {
        component.name = 'test-select';
        component.options = [
            { text: 'Option 1', value: 'option-1' },
            { text: 'Option 2', value: 'option-2' },
        ];
        component.resetText = 'Select an option';
        component.multiple = true;
        fixture.detectChanges();

        const options = fixture.debugElement.queryAll(By.css('option'));
        expect(options.length).toBe(2);
    });

    it('should bind value', () => {
        const select = fixture.debugElement.query(
            By.css('select')
        ).nativeElement;
        expect(component.value).toBe(null);
        component.writeValue('2');
        fixture.detectChanges();
        expect(component.value).toEqual(['2']);
    });

    it('should bind multiple value', () => {
        component.multiple = true;
        fixture.detectChanges();
        const select = fixture.debugElement.query(
            By.css('select')
        ).nativeElement;
        expect(select.multiple).toBe(true);
        expect(component.value).toEqual(null);
        component.writeValue(['1', '2'] as unknown as string);
        fixture.detectChanges();
        expect(component.value).toEqual(['1', '2']);
    });

    it('should call onChange method', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        component.onModelChange(['1']);
        expect(onChangeSpy).toHaveBeenCalledWith('1');
    });

    it('should call onTouched method', () => {
        const onTouchedSpy = spyOn(component, 'onTouched');
        component.onTouched();
        expect(onTouchedSpy).toHaveBeenCalled();
    });
});
