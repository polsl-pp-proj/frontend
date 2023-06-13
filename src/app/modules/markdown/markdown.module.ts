import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MARKED } from './configs/injection-tokens.config';
import { marked } from 'marked';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [{ provide: MARKED, useValue: marked }],
})
export class MarkdownModule {}
