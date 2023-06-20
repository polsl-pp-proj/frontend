import { EventEmitter, Inject, Injectable } from '@angular/core';
import { MARKED } from '../configs/injection-tokens.config';
import { marked as markedLib } from 'marked';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
    constructor(@Inject(MARKED) private readonly marked: typeof markedLib) {}

    parseSync(value: string, options: markedLib.MarkedOptions): string {
        return this.marked(value, options);
    }

    parse(value: string, options: markedLib.MarkedOptions): Observable<string> {
        return from(this.marked.parse(value, { ...options, async: true }));
    }
}
