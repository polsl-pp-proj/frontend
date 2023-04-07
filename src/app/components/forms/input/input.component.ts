import { Component, ElementRef, Input, forwardRef } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() name!: string;
    @Input() type:
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'month'
        | 'number'
        | 'password'
        | 'search'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week' = 'text';
    @Input() placeholder = '';
    @Input() value = '';
    @Input() disabled = false;
    @Input() readOnly = false;
    @Input() displayErrors: boolean = true;
    @Input() errors!: ValidationErrors | null;
    @Input() errorMessages!: { [key: string]: string };

    private readonly nativeElement!: HTMLElement;

    constructor(private readonly elRef: ElementRef) {
        this.nativeElement = this.elRef.nativeElement as HTMLElement;
    }

    onInput(event: Event): void {
        const value = ((event as InputEvent).currentTarget as HTMLInputElement)
            .value;
        this.value = value;
        this.onChange(value);
    }

    writeValue(value: any): void {
        this.value = value ?? '';
    }
    registerOnChange(onChangeFn: any): void {
        this.onChange = onChangeFn;
    }
    registerOnTouched(onTouchedFn: any): void {
        this.onTouched = onTouchedFn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange: (value: any) => void = () => {};
    onTouched: () => void = () => {};

    get errorMessage(): string {
        if (
            this.errors &&
            this.nativeElement.classList.contains('ng-touched') &&
            this.nativeElement.classList.contains('ng-dirty')
        ) {
            for (const errorName in this.errorMessages) {
                if (this.errors[errorName]) {
                    return this.errorMessages[errorName];
                }
            }
            return 'Wypełnij poprawnie pole';
        }
        return ' ';
    }
}
