import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReReplyModalComponent } from './rereply-modal.component';

describe('ReReplyModalComponent', () => {
    let component: ReReplyModalComponent;
    let fixture: ComponentFixture<ReReplyModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReReplyModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReReplyModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
