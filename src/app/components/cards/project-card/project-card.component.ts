import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
    @Input() imageUrl!: string;
    @Input() imageAlt!: string;
    @Input() projectName!: string;
    @Input() projectDescription!: string;
    @Input() buttonText: string = 'Odwiedź projekt';
    @Input() projectOrg!: string;
    @Output() visitProject = new EventEmitter<void>();
}
