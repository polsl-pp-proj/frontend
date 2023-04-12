import { Component, ElementRef, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
    ],
})
export class SelectComponent<T> {
    @Input() name!: string;
    @Input() options: {
        text: string;
        value: T;
        disabled?: boolean;
        selected?: boolean;
    }[] = [];
    @Input() resetText: string = '';
    @Input() value: T | T[] | null = null;
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() readOnly = false;
    @Input() displayErrors: boolean = true;
    @Input() errors!: ValidationErrors | null;
    @Input() errorMessages!: { [key: string]: string };

    private readonly nativeElement!: HTMLElement;

    constructor(private readonly elRef: ElementRef) {
        this.nativeElement = this.elRef.nativeElement as HTMLElement;
    }

    onModelChange(values: T[]): void {
        this.value = values;
        this.onChange(this.multiple ? values : values[0]);
    }

    writeValue(value: T | T[]): void {
        this.value = value
            ? Array.isArray(value)
                ? value
                : [value as T]
            : null;
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
            return this.multiple
                ? 'Wybierz poprawne wartości'
                : 'Wybierz poprawną wartość';
        }
        return ' ';
    }
}
