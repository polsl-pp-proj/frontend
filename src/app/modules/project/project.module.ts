import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectApiModule } from './modules/project-api/project-api.module';
import { OpenPositionApiModule } from './modules/open-position-api/open-position-api.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ProjectApiModule, OpenPositionApiModule],
})
export class ProjectModule {}
