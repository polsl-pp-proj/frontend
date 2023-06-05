import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements AfterViewInit {
    @Input() type: 'clear' | 'translucent' | 'color' | 'danger' = 'clear';
    @Input() icon?: SafeHtml | null = undefined;
    @Input() iconPosition: 'before' | 'after' = 'before';
    @Input() disabled = false;
    private viewInitialized = false;

    @ViewChild('textContent', { read: ElementRef })
    textRef!: ElementRef;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.viewInitialized = true;
        this.changeDetectorRef.detectChanges();
    }

    get iconOnly() {
        return (
            this.viewInitialized && this.textRef.nativeElement.innerText === ''
        );
    }
}
