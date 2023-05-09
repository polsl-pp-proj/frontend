import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageType } from '../enums/data-storage-type.enum';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    private changeObservables = new Map<
        DataStorageType,
        EventEmitter<any | undefined>
    >();

    constructor() {
        this.init();
    }

    private init() {
        window.addEventListener('storage', (e) => {
            if (e.storageArea === localStorage) {
                if (e.key) {
                    this.changeObservables
                        .get(e.key as DataStorageType)
                        ?.emit(this.get(e.key as DataStorageType));
                } else {
                    this.changeObservables.forEach((emitter) =>
                        emitter.emit(undefined)
                    );
                }
            }
        });
    }

    get<T = object>(type: DataStorageType): T {
        try {
            return JSON.parse(localStorage.getItem(type) ?? '{}') as T;
        } catch (ex) {
            if (ex instanceof SyntaxError) {
                this.set(type, {} as T);
                return {} as T;
            }
            throw ex;
        }
    }

    set<T = object>(type: DataStorageType, data: T): void {
        localStorage.setItem(type, JSON.stringify(data));
        this.changeObservables.get(type)?.emit(data);
    }

    dataChangeObservable<T = object>(
        type: DataStorageType
    ): Observable<T | undefined> {
        if (this.changeObservables.has(type)) {
            return this.changeObservables
                .get(type)!
                .asObservable() as Observable<T | undefined>;
        }
        const emitter = new EventEmitter<T | undefined>();
        this.changeObservables.set(type, emitter);
        return emitter.asObservable();
    }
}
