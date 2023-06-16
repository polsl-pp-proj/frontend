import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownService } from '../services/markdown.service';

@Pipe({
    name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
    constructor(private readonly markdownService: MarkdownService) {}

    transform(value: string): string {
        if (value && value.length > 0) {
            return this.markdownService.parseSync(value, {
                gfm: true,
                xhtml: true,
            });
        }
        return value;
    }
}
