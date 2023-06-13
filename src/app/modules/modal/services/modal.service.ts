import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modalState: Map<string, BehaviorSubject<boolean>> = new Map<
        string,
        BehaviorSubject<boolean>
    >(); // false - closed, true - open

    constructor() {}

    registerModal(name: string) {
        const modalStateSubject = new BehaviorSubject(false);
        this.modalState.set(name, modalStateSubject);
        return modalStateSubject.asObservable();
    }

    updateModalState(name: string, state: 'open' | 'close') {
        const modalStateSubject = this.modalState.get(name);
        if (modalStateSubject) {
            if (modalStateSubject.value !== (state === 'open')) {
                modalStateSubject.next(state === 'open');

                const html = <HTMLHtmlElement>(
                    window.document.querySelector('html')
                );
                if (state === 'open') {
                    html.style.overflowY = 'hidden';
                } else if (this.openModalsNumber === 0) {
                    html.style.overflowY = 'unset';
                }
            }
            return;
        }
        throw new Error(`Modal does not exist: ${name}`);
    }

    unregisterModal(name: string) {
        if (this.modalState.has(name)) {
            (<BehaviorSubject<boolean>>this.modalState.get(name)).next(false);
            (<BehaviorSubject<boolean>>this.modalState.get(name)).complete();
            (<BehaviorSubject<boolean>>this.modalState.get(name)).unsubscribe();
            this.modalState.delete(name);

            if (this.openModalsNumber === 0) {
                (<HTMLHtmlElement>(
                    window.document.querySelector('html')
                )).style.overflowY = 'unset';
            }
            return;
        }
        throw new Error('Modal does not exist');
    }

    get openModalsNumber(): number {
        return Array.from(this.modalState.values()).filter((subject) =>
            subject.getValue()
        ).length;
    }
}
