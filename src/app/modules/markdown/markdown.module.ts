import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MARKED } from './configs/injection-tokens.config';
import { marked } from 'marked';
import { MarkdownPipe } from './pipes/markdown.pipe';

@NgModule({
    declarations: [MarkdownPipe],
    imports: [CommonModule],
    providers: [{ provide: MARKED, useValue: marked }],
    exports: [MarkdownPipe],
})
export class MarkdownModule {}
