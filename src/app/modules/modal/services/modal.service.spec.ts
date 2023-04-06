import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { BehaviorSubject, Observable } from 'rxjs';

describe('ModalService', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModalService);
    });

    describe('registerModal', () => {
        it('should create new subject', () => {
            const modalName = 'test-modal';
            const observable = service.registerModal(modalName);
            expect(observable instanceof Observable<boolean>).toBeTrue();
            expect(
                service['modalState'].get(modalName)! instanceof
                    BehaviorSubject<boolean>
            ).toBeTrue();
        });

        it('should add new modal state to the map', () => {
            const modalName = 'test-modal';
            service.registerModal(modalName);
            expect(service['modalState'].has(modalName)).toBeTrue();
        });

        it('should return observable associated with newly created subject', () => {
            const modalName = 'test-modal';
            const observable = service.registerModal(modalName);
            expect(observable).toEqual(
                service['modalState'].get(modalName)!.asObservable()
            );
        });
    });

    describe('updateModalState', () => {
        it('should throw an error when modal does not exist', () => {
            const modalName = 'test-modal';
            expect(() => service.updateModalState(modalName, 'open')).toThrow(
                new Error('Modal does not exist')
            );
        });

        it('should update modal state when modal exists', () => {
            const modalName = 'test-modal';
            service.registerModal(modalName);
            service.updateModalState(modalName, 'open');
            expect(service['modalState'].get(modalName)!.getValue()).toBeTrue();
        });

        it('should update the modal state if it is different', () => {
            const modalName = 'test-modal';
            service.registerModal(modalName).subscribe();
            spyOn(
                service['modalState'].get(modalName)!,
                'next'
            ).and.callThrough();
            service.updateModalState(modalName, 'open');
            service.updateModalState(modalName, 'close');
            service.updateModalState(modalName, 'open');

            expect(
                service['modalState'].get(modalName)!.next
            ).toHaveBeenCalledTimes(3);
        });

        it('should not update the modal state if it is the same', () => {
            const modalName = 'test-modal';
            service.registerModal(modalName).subscribe();
            spyOn(
                service['modalState'].get(modalName)!,
                'next'
            ).and.callThrough();
            service.updateModalState(modalName, 'open');
            service.updateModalState(modalName, 'close');
            service.updateModalState(modalName, 'close');
            service.updateModalState(modalName, 'close');

            expect(
                service['modalState'].get(modalName)!.next
            ).toHaveBeenCalledTimes(2);
        });

        it('should update associated subject with modal state', () => {
            const modalName = 'test-modal';
            service.registerModal(modalName);
            service.updateModalState(modalName, 'open');
            expect(service['modalState'].get(modalName)!.getValue()).toBeTrue();
        });

        it('should set html overflowY to hidden when open modal is the first one', () => {
            const modalName = 'test-modal';
            spyOn(document, 'querySelector').and.returnValue({
                style: { overflowY: '' },
            } as unknown as Element);
            service.registerModal(modalName);
            service.updateModalState(modalName, 'open');
            expect(document.querySelector).toHaveBeenCalledWith('html');
            expect(document.querySelector('html')!.style.overflowY).toBe(
                'hidden'
            );
        });

        it('should set html overflowY to unset when closing last modal', () => {
            const modalName = 'test-modal';
            spyOn(document, 'querySelector').and.returnValue({
                style: { overflowY: '' },
            } as unknown as Element);
            service.registerModal(modalName);
            service.updateModalState(modalName, 'open');
            service.updateModalState(modalName, 'close');
            expect(document.querySelector).toHaveBeenCalledWith('html');
            expect(document.querySelector('html')!.style.overflowY).toBe(
                'unset'
            );
        });
    });

    describe('unregisterModal', () => {
        it('should throw an error if the modal does not exist', () => {
            expect(() => {
                service.unregisterModal('nonexistent-modal');
            }).toThrowError('Modal does not exist');
        });

        it('should unregister the modal if it exists', () => {
            const modalName = 'test-modal';
            const modalState = service.registerModal(modalName);

            // subscribe to modalState to make sure it completes
            modalState.subscribe(() => {});

            service.unregisterModal(modalName);

            expect(() => {
                service.unregisterModal(modalName);
            }).toThrowError('Modal does not exist');
        });

        it('should unset the overflowY style if there are no more open modals', () => {
            const modalName = 'test-modal';
            const modalState = service.registerModal(modalName);
            service.updateModalState(modalName, 'open');

            // subscribe to modalState to make sure it completes
            modalState.subscribe(() => {});

            service.unregisterModal(modalName);

            expect(document.documentElement.style.overflowY).toBe('unset');
        });

        it('should not unset the overflowY style if there are still open modals', () => {
            const modalName1 = 'test-modal-1';
            const modalName2 = 'test-modal-2';
            const modalState1 = service.registerModal(modalName1);
            const modalState2 = service.registerModal(modalName2);
            service.updateModalState(modalName1, 'open');
            service.updateModalState(modalName2, 'open');

            // subscribe to modalState to make sure it completes
            modalState1.subscribe(() => {});
            modalState2.subscribe(() => {});

            service.unregisterModal(modalName2);

            expect(document.documentElement.style.overflowY).not.toBe('unset');
        });
    });
});
